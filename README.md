# wx_upload_aliOss
[<kbd>colorUI</kbd>](https://github.com/weilanwl/ColorUI) <kbd>阿里云的OSS</kbd>
>基于colorUI的微信小程序上传图片视频  
>由于客户需求多图上传，上传视频，  
>类似于微信朋友圈的上传方式
##食用方法
> <kbd>colorui</kbd>
>>这个目录是colorUI的集成目录，高颜值的小程序UI，了解请点击上方链接  
>
><kbd> pages</kbd>
>> <kbd>index</kbd>
>>> <kbd>index.js</kbd> 里面存放上传方法（基本都有标注）
>
><kbd> utils  </kbd>
>> 里面有很多上传函数的文件 除开util.js文件是时间处理文件 其他都是OSS上传所需的文件  
>>  <kbd>config.js</kbd>里面有一个OSS的配置文件，使用前请修改     
>
> <kbd>app.js</kbd> 里面有一个uploadImg()函数为上传函数（使用异步方法）


##相关代码
###config.js
```js
    var fileHost = "https://*********.oss-cn-hangzhou.aliyuncs.com/";//你的阿里云地址最后面跟上一个/   在你当前小程序的后台的uploadFile 合法域名也要配上这个域名
    var config = {
        //aliyun OSS config
        uploadImageUrl: `${fileHost}`, // 默认存在根目录，可根据需求改
        AccessKeySecret: 'AccessKeySecret',        // AccessKeySecret 去你的阿里云上控制台上找
        OSSAccessKeyId: 'AccessKeyId',         // AccessKeyId 去你的阿里云上控制台上找
        timeout: 87600 //这个是上传文件时Policy的失效时间
    };
    module.exports = config
```
###封装的图片上传文件
```js
   uploadImg(pics){
    return new Promise((resolve, reject) => {
      let date = utils.formatDate(new Date)
      const dir = 'wx/images/'+date+ '/'  //文件默认上传到根目录下的 wx/images/$(时间)$/这个目录下
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
  }
```
### 上传视频(由于只需要上传一个就没有写异步了)
+ 类似于上传图片，前面默认加了 wx.showLoding（）
```js
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

```
### 想了解更多colorUI的 请加群（QQ：760786796）
