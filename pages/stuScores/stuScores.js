// pages/stuScores/stuScores.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    studentList: [],
    currentStudent: {}
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
    this.getStudentList()
    const currentStudent = wx.getStorageSync('defaultStudent')
    const userId = wx.getStorageSync('userId')
    if (currentStudent) {
      let param = {
        userId: userId,
        orgNo: currentStudent.orgNo,
        departName: currentStudent.departName,
        name: currentStudent.studentName,
        pageSize: 5,
        pageNum: 1
      }
      this.getStuScores(param)
    }
  },

  // 获取成绩数据
  getStuScores: function (param) {
    let that = this
    wx.request({
      url: 'https://duchengedu.com/ws-study/app/school/getStuScores',
      method: 'POST',
      data: param,
      success: function (res) {
        console.log(res)
        that.setData({
          list: res.data.data.pageData
        })
      }
    })
  },

  // 获取学生列表
  getStudentList: function () {
    const that = this
    const userId = wx.getStorageSync('userId')
    if (!userId) {
      wx.showToast({
        title: '请先绑定用户信息~',
        icon: 'none'
      })
      setTimeout(function () {
        wx.switchTab({
          url: '../my/my',
        })
      }, 2000)
    } else {
      const currentStudent = wx.getStorageSync('defaultStudent')
      wx.request({
        url: app.globalData.URL + 'app/user/getChildrenByUser?userId=' + userId,
        method: 'POST',
        success: function (res) {
          console.log(res)
          if (res.data.code == 1) {
            if (res.data.data.length == 0) {
              wx.showToast({
                title: '还未绑定学生信息~',
                icon: 'none'
              })
              setTimeout(function () {
                wx.switchTab({
                  url: '../my/my',
                })
              }, 2000)
            } else {
              that.setData({
                studentList: res.data.data,
                currentStudent: currentStudent
              })
            }
          }
        }
      })
    }
  },

  // 选中学生
  pickSchoolChange: function (e) {
    const that = this
    const userId = wx.getStorageSync('userId')
    console.log(e)
    const currentStudent = that.data.studentList[e.detail.value]
    console.log(currentStudent)
    that.setData({
      currentStudent: currentStudent
    })
    let param = {
      userId: userId,
      orgNo: currentStudent.orgNo,
      departName: currentStudent.departName,
      name: currentStudent.studentName,
      pageSize: 5,
      pageNum: 1
    }
    console.log(param)
    that.getStuScores(param)
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