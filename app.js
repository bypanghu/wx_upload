//app.js
const utils = require('./utils/util')
const uploadImage = require('./utils/uploadFile.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    
  },
   //封装上传图片函数
   uploadImg(pics){
    return new Promise((resolve, reject) => {
      let date = utils.formatDate(new Date)
      const dir = 'wx/images/'+date+ '/'
      //上传图片
      //图片路径可自行修改
      uploadImage(pics,dir,
        function (result) {
          console.log("======上传成功图片地址为：", result);
          resolve(result);
        }, function (result) {
          console.log("======上传失败======", result);
          reject(result)
        }
      )
    })
  },
  globalData: {
    userInfo: null
  }
})