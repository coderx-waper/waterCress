//app.js
App({
  onLaunch: function () {
    wx.db = {}
    wx.db.url = (url) => {
      return `http://123.207.32.32:8001/api/douban/movie/${url}`
    }

    const info = wx.getSystemInfoSync();
    wx.db.statusBarHeight = info.statusBarHeight
    if (info.platform == 'android') {
      wx.db.navBarHeight = 48
    } else {
      wx.db.navBarHeight = 44
    }

  },

  globalData: {
    userInfo: null
  }
})