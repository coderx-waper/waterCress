// components/nav-bar/nav-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    statusBarColor: {
      type: String,
      value: '#fff'
    },
    navBarColor: {
      type: String,
      value: '#fff'
    },
    back:{
      type: String,
      value: 'true'
    },
    home:{
      type: String,
      value: 'true'
    },
    color:{
      type: String,
      value: '#1C1C1C'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    topHeight:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back(){
      wx.navigateBack()
    },
    home(){
      wx.navigateBack({
        delta: 999,
      })
    }
  },

  lifetimes: {
    attached() {
      
      const statusBarStyle = `
      height: ${wx.db.statusBarHeight}px;
      background-color: ${this.data.statusBarColor};   
      `
      const navBarStyle = `
      height: ${wx.db.navBarHeight}px;
      background-color: ${this.data.navBarColor};
      color:${this.data.color}
      `

      const topHeight = wx.db.statusBarHeight +  wx.db.navBarHeight

      this.setData({statusBarStyle,navBarStyle,topHeight})
    
    }
  }
})
