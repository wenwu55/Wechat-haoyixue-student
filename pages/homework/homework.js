// pages/homework/homework.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: [
      {
        text: '通用'
      },
      {
        text: '语文'
      },
      {
        text: '数学'
      },
      {
        text: '英语'
      },
      {
        text: '地理'
      },
      {
        text: '生物'
      },
      {
        text: '历史'
      },
      {
        text: '政治'
      },
      {
        text: '物理'
      },
      {
        text: '化学'
      }
    ],
    currentTab: 0,
    navScrollLeft: 0,
    workList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })  
  },
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.getHomeworks(cur)
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },

  /**
   * 获取作业
   * 1.语文2.数学3.英语4.地理5.生物6.历史7.政治8.物理9.化学
   */
  getHomeworks: function(index) {
    const that = this
    const defaultStudent = wx.getStorageSync('defaultStudent')
    const param = {
      category: Number(index),
      clazz: defaultStudent.departName,
      orgno: defaultStudent.orgNo,
      userId: defaultStudent.userId
    }
    wx.request({
      url: `${app.globalData.URL}app/homework/getUserHomeworks`,
      method: 'POST',
      data: param,
      success: function(res) {
        if (res.data.code === 1) {
          that.setData({
            workList: res.data.data.pageData
          })
        }
      }
    })
  },
  // 查看作业详情
  goDetail: function(e) {
    console.log(e.currentTarget.dataset)
    const dataset = e.currentTarget.dataset
    const createtime = dataset.createtime.substring(0, 10)
    wx.navigateTo({
      url: `../homeworkDetail/homeworkDetail?title=${dataset.title}&pics=${dataset.pics}&content=${dataset.content}&createTime=${createtime}`
    })
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
    const that = this
    that.getHomeworks(0)
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