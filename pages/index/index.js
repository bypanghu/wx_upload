// pages/share/add/index.js
const upload = require('../../utils/uploadFile')
const utils =require('../../utils/util')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    shareContentInput:'',
    imgList : [],
    type:"img"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  shareContentInput(e) {
    this.setData({
      shareContentInput: e.detail.value
    })
  },
 
  ChooseImage() {
    wx.showModal({
      content : '请选择上传视频或者图片',
      cancelText:'视频',
      confirmText:'图片',
      success:(res)=>{
        if(res.confirm){
          wx.chooseImage({
            count: 4, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album','camera'], //从相册选择
            success: (res) => {
              if (this.data.imgList.length != 0) {
                this.setData({
                  imgList: this.data.imgList.concat(res.tempFilePaths),
                  imgType : 'img'
                })
              } else {
                this.setData({
                  imgList: res.tempFilePaths,
                  type : 'img'
                })
              }
            }
          });
        }else if(res.cancel){
          wx.chooseVideo({
            sourceType: ['album','camera'],
            maxDuration: 30,
            camera: 'back',
            compressed: true,
            success:(res)=> {
              wx.showLoading({
                title: '上传视频中……',
              })
              let date = utils.formatDate(new Date)
              const dir = 'wx/videos/'+date
              upload(res.tempFilePath,dir,(res)=>{
                wx.hideLoading()
                this.setData({
                  type : 'video',
                  imgList:  res,
                })
             },res=>{
              wx.hideLoading({
                complete:(res)=>{
                  wx.showToast({
                    title: '发生错误，请重新打开小程序',
                  })
                }
              })
               console.log('上传失败')
             })
            }
          })
        }
      }
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除张照片吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  submint(){
    let pic = this.data.imgList
    let pics = [];
    let postData = {}
    wx.showLoading({
      title: '发表中……',
    })
    postData['title'] = this.data.shareContentInput
    if(this.data.imgType == 'img'){
        for(var a= 0;a < pic.length;a++){
          pics.push(app.uploadImg(pic[a]))
        }
      Promise.all(pics).then(result=>{
        let pics = "";
        result.map(item => {
          pics += item + ";"
        })
        pics = pics.slice(0, pics.length - 1);
        //发送数据
        postData['image'] = pics
        postData = JSON.stringify(postData)
        wx.hideLoading({
          complete: (res) => {
            //这里写传值操作
            console.log(postData)
          },
        })
         
        })
    }else{
      postData['image'] = this.data.imgList
      postData = JSON.stringify(postData)
      wx.hideLoading({
        complete: (res) => {
          //这里写传值操作
          console.log(postData)
        },
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})