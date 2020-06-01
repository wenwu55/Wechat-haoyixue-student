// pages/student/student.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolList: [],
    currentSchool: {},
    classList: [],
    currentClass: {},
    studentList: [],
    currentStudent: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSchoolList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 获取学校列表
  getSchoolList: function() {
    let that = this
    wx.request({
      url: app.globalData.URL + 'app/school/findSchoolList',
      method: 'POST',
      success: function(res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            schoolList: res.data.data
          })
        }
      }
    })
  },
  pickSchoolChange: function(e) {
    let that = this
    const currentSchool = that.data.schoolList[e.detail.value]
    // 如果切换不同学校 清除下面的数据
    if (currentSchool !== that.data.currentSchool) {
      that.setData({
        currentClass: {},
        currentStudent: {}
      })
    }
    // 查询当前学校下的班级列表
    wx.request({
      url: app.globalData.URL + 'app/school/getSchoolDeparts?schoolCode=' + currentSchool.schoolCode,
      method: 'POST',
      success: function(res) {
        if (res.statusCode == 200) {
          that.setData({
            currentSchool: currentSchool,
            classList: res.data.data
          })
        }
      }
    })
  },

  // 班级
  bindClassChange: function (e) {
    let that = this
    const currentClass = that.data.classList[e.detail.value]
    const schoolCode = that.data.currentSchool.schoolCode
    // 如果切换不同班级 清除学生的数据
    if (currentClass !== that.data.currentClass) {
      that.setData({
        currentStudent: {}
      })
    }
    // 查询当前班级下的学生列表
    wx.request({
      url: `${app.globalData.URL}app/school/getSchoolDepartStudents`,
      method: 'POST',
      data: {
        orgNo: schoolCode,
        departId: currentClass.depart_id
      },
      success: function (res) {
        if (res.statusCode == 200) {
          console.log(res.data)
          that.setData({
            currentClass: currentClass,
            studentList: res.data.data
          })
        }
      }
    })
  },

  // 学生
  bindStudentChange: function (e) {
    const that = this
    const currentStudent = that.data.studentList[e.detail.value]
    that.setData({
      currentStudent: currentStudent
    })
  },

  // 提交
  submit: function() {
    const that = this
    const currentSchool = that.data.currentSchool
    const currentClass = that.data.currentClass
    const currentStudent = that.data.currentStudent
    console.log(currentStudent)
    const userId = wx.getStorageSync('userId')
    if (!currentSchool.schoolCode) {
      wx.showToast({
        title: '请先选择学校！',
        icon: 'none'
      })
      return false
    }
    if (!currentClass.depart_id) {
      wx.showToast({
        title: '请先选择班级!',
        icon: 'none'
      })
      return false
    }
    if (!currentStudent.work_no) {
      wx.showToast({
        title: '学生卡号为空，请确认选择学生后联系学校管理员!',
        icon: 'none'
      })
      return false
    }
    if (!currentStudent.card_physics_no) {
      wx.showToast({
        title: '学生物理卡号为空，请确认选择学生后联系学校管理员!',
        icon: 'none'
      })
      return false
    }
    const param = {
      userId: userId,
      orgNo: currentSchool.schoolCode,
      departName: currentClass.depart_name,
      departId: currentClass.depart_id,
      clazz: currentClass.depart_name,
      workNo: currentStudent.work_no,
      studentName: currentStudent.real_name,
      cardPlatformNo: currentStudent.card_platform_no,
      cardPhysicsNo: currentStudent.card_physics_no,
      identity: currentStudent.identity,
      status: currentStudent.status
    }
    console.log(param)
    wx.request({
      url: `${app.globalData.URL}app/user/addStudentRelation`,
      method: 'POST',
      data: param,
      success: function (res) {
        console.log(res)
        if (res.data.code == 1) {
          wx.showToast({
            title: '新增成功'
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
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