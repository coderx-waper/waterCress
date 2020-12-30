// pages/login/login.js
Page({
  wechatLogin (){
    console.log('微信登录')
  },
  doubanLogin (){
    console.log('豆瓣登录')
  },
  privacy (){
    wx.navigateTo({
      url: '/pages/agreement/agreement',
    })
  }
})