// component/movie-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movie: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */ 
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    detail (){
      //进行对象序列化
      wx.navigateTo({
        url: `/pages/detail/detail?movie=${JSON.stringify(this.properties.movie)}`,
      })
    }
  }
})
