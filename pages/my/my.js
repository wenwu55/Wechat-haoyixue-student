//my.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: wx.getStorageSync("userInfo") || app.globalData.userInfo,
    phone: wx.getStorageSync("phone")
  },
  onLoad: function () {
  },
  // callback
  getUserInfo(res) {
    console.log(res)
    let that = this
    that.setData({
      userInfo: res.detail.userInfo
    })
    app.globalData.userInfo = res.detail.userInfo
    wx.setStorageSync("userInfo", res.detail.userInfo)
  },
  bindPhone: function() {
    const phone = wx.getStorageSync("phone")
    if (!phone) {
      wx.navigateTo({
        url: '../bindPhone/bindPhone'
      })
    } else {}
  },
  //
  queryResults: function() {
    wx.navigateTo({
      url: '../stuScores/stuScores'
    })
  }, 
  // 
  bindStudent: function() {
    // 如果未绑定手机号
    if (!wx.getStorageSync('phone')) {
      wx.showToast({
        title: '请先绑定手机~',
        icon: 'none'
      })
      return false
    }
    wx.navigateTo({
      url: '../bindStudent/bindStudent'
    })
  }
})
