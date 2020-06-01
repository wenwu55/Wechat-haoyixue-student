// pages/studentMessage/studentMessage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  // 获取留言列表
  getMessageList: function() {
    const that = this
    const userId = wx.getStorageSync('userId')
    wx.request({
      url: `${app.globalData.URL}leaveMessage/getMessageByUserId`,
      method: 'POST',
      data: {userId: userId},
      success: function(res) {
        if(res.data.code == 0) {
          that.setData({
            messageList: res.data.data
          })
        }
      }
    })
  },

  goDetail: function(e) {
    const detail = e.currentTarget.dataset
    console.log(detail)
    const content = detail.content
    const year = detail.time.substring(0, 10)
    const hour = detail.time.substring(11, 19)
    wx.navigateTo({
      url: `../messageDetail/messageDetail?content=${content}&year=${year}&hour=${hour}`
    })
  },

  addMessage: function () {
    wx.navigateTo({
      url: '../addMessage/addMessage'
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
    this.getMessageList()
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