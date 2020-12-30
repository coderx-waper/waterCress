// pages/home/home.js

Page({
  data: {
    allMovies: [
      {
        title: '影院热映',
        url: 'in_theaters',
        movies: [] // res.data.subjects
      },
      {
        title: '新片榜',
        url: 'new_movies',
        movies: []
      },
      {
        title: '口碑榜',
        url: 'weekly',
        movies: []
      },
      {
        title: '北美票房榜',
        url: 'us_box',
        movies: []
      },
      {
        title: 'Top250',
        url: 'top250',
        movies: []
      }
    ]
  },

  watchMoreMovies(evt) {
    console.log(evt)
    const idx = evt.currentTarget.dataset.index
    let obj = this.data.allMovies[idx]
    wx.navigateTo({
      url: `/pages/list/list?title=${obj.title}& url=${obj.url}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadLoalData()
    // this.loadCity((city) => {
    //   this.loadNewData(0, { city: city })
    // })
    // this.loadNewData(1)
    // this.loadNewData(2)
    // this.loadNewData(3)
    // this.loadNewData(4)
  },

  loadLoalData() {
    for (let index = 0; index < this.data.allMovies.length; index++) {
      let obj = this.data.allMovies[index]
      obj.movies = wx.getStorageSync(obj.title)
    }
    this.setData(this.data)
  },

  loadNewData(idx, params) {
    wx.request({
      url: wx.db.url(this.data.allMovies[idx].url),
      data: params,
      header: { 'content-type': 'json' },
      success: (res) => {
        console.log(res)
        // let movies = res.data.subjects
        let movies = res.data.subjects.slice(0,10) //数据太大 实例做了截取，请删除
        let obj = this.data.allMovies[idx]
        obj.movies = []
        for (let index = 0; index < movies.length; index++) {
          let movie = movies[index]
          this.updateMovie(movie)
          obj.movies.push(movie)
        }
        this.setData(this.data)
        wx.setStorage({
          data: obj.movies,
          key: obj.title,
        })

      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  loadCity(success) {
    // 逆地理编码
    wx.getLocation({
      success: (res) => {
        wx.request({
          url: 'https://api.map.baidu.com/reverse_geocoding/v3',
          data: {
            output: 'json',
            coordtype: 'wgs84ll',
            ak: '9zTl9xXSCCA8FTnsqQA9Ro8B1mO85v4W',
            location: `${res.latitude},${res.longitude}`
          },
          success: (res) => {
            let city = res.data.result.addressComponent.city
            city = city.substring(0, city.length - 1)
            success && success(city)
          },
          fail: (err) => {
            console.log(err)
          }
        })

      },
      fail: (error) => {
        console.log(error)
      }
    })
  },

  updateMovie(movie) {
    let stars = parseInt(movie.rating.stars)
    if (stars == 0) return
    movie.stars = {}
    movie.stars.on = parseInt(stars / 10)
    movie.stars.half = (stars - (movie.stars.on) * 10) > 0
    movie.stars.off = parseInt((50 - stars) / 10)
  }

})