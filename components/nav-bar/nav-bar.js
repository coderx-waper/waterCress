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
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarStyle: '',
    navBarStyle: '',
    topHeight: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    lifetimes: {
      attached() {
        const statusBarStyle = `
        height: ${wx.db.statusHeight} px;
        background-color: ${this.data.statusBarColor};   
        `
        const navBarStyle = `
        height: ${wx.db.navBarHeight} px;
        background-color: ${this.data.navBarColor};
        `

        this.setData({ statusBarStyle, navBarStyle })

        const topHeight = wx.db.statusHeight + wx.db.navBarHeight

        this.setData({ topHeight })
      }
    }
  }
})
