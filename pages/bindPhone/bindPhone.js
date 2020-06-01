// pages/bindPhone/bindPhone.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    const session_key = wx.getStorageSync('session_key')
    const openid = wx.getStorageSync('openid')
    const unionid = wx.getStorageSync('unionid')
    // 如果存在session_key
    if (session_key) {
      wx.request({
        url: app.globalData.URL + 'miniProgram/getPhoneNumber',
        method: 'POST',
        data: {
          openId: openid,
          unionid: unionid,
          iv: e.detail.iv,
          encrypted: e.detail.encryptedData,
          sessionKey: session_key,
          type: 1
        },
        success: function (r) {
          console.log(r)
          wx.setStorageSync('roleId', r.data.data.role)
          wx.setStorageSync('userId', r.data.data.userId)
          wx.setStorageSync('phone', r.data.data.phone)
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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