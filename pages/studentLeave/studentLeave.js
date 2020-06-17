// pages/studentLeave/studentLeave.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leaveList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
  },

  // 获取学生请假
  getLeaveList: function () {
    const that = this
    const cardPhysicsNo = wx.getStorageSync('defaultStudent').cardPhysicsNo
    const orgNo = wx.getStorageSync('defaultStudent').orgNo
    if (!cardPhysicsNo) {
      that.setData({
        leaveList: []
      })      
    } else {
      wx.request({
        url: `${app.globalData.URL}forLeave/getLeaveByUserId`,
        method: 'POST',
        data: { physicalNo: cardPhysicsNo, orgNo: orgNo },
        success: function(res) {
          console.log(res)
          if (res.data.code == 0) {
            that.setData({
              leaveList: res.data.data
            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none'
            })
          }
        }
      })
    }
  },

  addLeave: function () {
    wx.navigateTo({
      url: '../addLeave/addLeave',
    })
  },

  goDetail: function (e) {
    const dataset = e.currentTarget.dataset
    console.log(dataset)
    const createY = dataset.createtime.substring(0, 10)
    const createH = dataset.createtime.substring(11, 19)
    const startY = dataset.starttime.substring(0, 10)
    const startH = dataset.starttime.substring(11, 19)
    const endY = dataset.endtime.substring(0, 10)
    const endH = dataset.endtime.substring(11, 19)
    wx.navigateTo({
      url: `../leaveDetail/leaveDetail?name=${dataset.name}&forStatus=${dataset.forstatus}&content=${dataset.content}&createY=${createY}&createH=${createH}&startY=${startY}&startH=${startH}&endY=${endY}&endH=${endH}`
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
    this.getLeaveList()
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