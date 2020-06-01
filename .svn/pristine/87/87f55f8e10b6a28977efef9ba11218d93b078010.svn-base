// pages/addMessage/addMessage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    length: 0,
    leaveContent: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  submit: function () {
    const that = this
    const defaultStudent = wx.getStorageSync('defaultStudent')
    const param = {
      leaveContent: that.data.leaveContent,
      userId: defaultStudent.userId,
      cardPhysicsNo: defaultStudent.cardPhysicsNo
    }
    console.log(param)
    wx.request({
      url: `${app.globalData.URL}leaveMessage/insertMessage`,
      method: 'POST',
      data: param,
      success: function(res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: '新增留言成功'
          })
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      }
    })
  },

  // input
  changeInput: function (e) {
    const that = this
    const length = e.detail.value.length
    that.setData({
      length: length,
      leaveContent: e.detail.value
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