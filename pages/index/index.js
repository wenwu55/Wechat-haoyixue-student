//index.js
import util from '../../utils/util.js'
console.log(util.formatTime('20191021235959'))
//获取应用实例
const app = getApp()

Page({
  data: {
    navbarStatus: 1,
    date: "2019-10-08",
    pageSize: 10,
    pageNo: 1,
    accessList: [],
    accessLoading: false,
    loadText: '加载更多',
    totalPages: 1,
    start_date: '',
    end_date: '',
    expenseList: [],
    noDate: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 时间picker改变
  bindStartDateChange: function (e) {
    const that = this
    that.setData({
      start_date: e.detail.value
    })
    that.getUserExpenseList(e.detail.value, that.data.end_date)
  },
  // 时间picker改变
  bindEndDateChange: function (e) {
    const that = this
    that.setData({
      end_date: e.detail.value
    })
    that.getUserExpenseList(that.data.start_date, e.detail.value)
  },
  // 点击navbar切换
  changeStatus: function(event) {
    let that = this;
    that.setData({
      navbarStatus: event.currentTarget.dataset.status
    })
  },
  onLoad: function () {
  },
  onShow: function() {
    // 获取当前时间
    const date = new Date()
    const year = date.getFullYear()
    const month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : `0${(date.getMonth() + 1)}`
    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
    const newDate = `${year}-${month}-${day}`
    let start_date = this.getDateStr(-30)
    this.setData({
      start_date: start_date,
      end_date: newDate
    })

    this.getAccessList()
    this.getUserExpenseList(start_date, newDate)
  },
  // 计算时间
  getDateStr: function (AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0
    return y + "-" + m + "-" + d;
  },
  // 切换页面时清除当前页面数据
  onHide: function () {
    console.log(111)
    this.setData({
      pageSize: 10,
      pageNo: 1,
      accessList: [],
      expenseList: []
    })
  },
  /**
   * 获取门禁列表
   * param {consumerName, startRecordTime, endRecordTime, orgNo, pageSize, pageNum}
   */
  getAccessList: function() {
    // 判断用户是否登录并绑定了学生
    const that = this
    const userId = wx.getStorageSync('userId')
    let defaultStudent = wx.getStorageSync('defaultStudent')
    // 计算时间  默认查询近四个月
    const endRecordTime = that.Month(0)
    const startRecordTime = that.Month(-4)
    if (userId) {
      // 授权登录过但未设置过默认学生
      if (!defaultStudent.departName) {
        // 设置默认学生
        wx.request({
          url: app.globalData.URL + 'app/user/getChildrenByUser?userId=' + userId,
          method: 'POST',
          success: function (res) {
            if (res.statusCode === 200) {
              if (res.data.data.length === 0) {
                wx.showToast({
                  title: '您还未绑定学生,请前往我的页面绑定学生',
                  icon: 'none'
                })
                return false
              }
              // 没有的话把列表第一项当默认的并存入缓存
              defaultStudent = res.data.data[0]
              wx.setStorageSync('defaultStudent', defaultStudent)
              // 请求门禁
              const param = {
                consumerName: defaultStudent.studentName,
                cardPhyNo: defaultStudent.cardPhysicsNo,
                orgNo: defaultStudent.orgNo,
                startRecordTime: startRecordTime,
                endRecordTime: endRecordTime,
                pageSize: that.data.pageSize,
                pageNo: that.data.pageNo,
                userId: userId
              }
              wx.request({
                url: `${app.globalData.URL}app/user/getInoutRecord`,
                method: 'POST',
                data: param,
                success: function(res) {
                  if (res.data.code == 1) {
                    let list = res.data.data.list
                    console.log(list)
                    if (list.length == 0) {
                      this.setData({
                        noDate: true
                      })
                    }
                    list.forEach(item => {
                      item.createTime = util.formatTime(item.createTime)
                    })
                    // 如果已经存在accessList并且不是第一页的情况下
                    if (that.data.accessList.length > 0 && that.data.pageSize != 1) {
                      list = that.data.accessList.concat(list)
                    }
                    that.setData({
                      accessList: list,
                      pageNo: res.data.data.page.curPage + 1,
                      totalPages: res.data.data.page.totalPages,
                      accessLoading: false
                    })
                  }
                },
                fail: function(err) {
                  console.log(err)
                }
              })
            }
          }
        })
      } else {
        // 请求门禁
        const param = {
          consumerName: defaultStudent.studentName,
          orgNo: defaultStudent.orgNo,
          startRecordTime: startRecordTime,
          endRecordTime: endRecordTime,
          pageSize: that.data.pageSize,
          pageNo: that.data.pageNo,
          userId: userId,
          cardPhyNo: defaultStudent.cardPhysicsNo
        }
        wx.request({
          url: `${app.globalData.URL}app/user/getInoutRecord`,
          method: 'POST',
          data: param,
          success: function (res) {
            if (res.data.code == 1) {
              let list = res.data.data.list
              if (list.length == 0) {
                this.setData({
                  noDate: true
                })
              }
              list.forEach(item => {
                item.createTime = util.formatTime(item.createTime)
              })
              // 如果已经存在accessList并且不是第一页的情况下
              if (that.data.accessList.length > 0 && that.data.pageSize != 1) {
                list = that.data.accessList.concat(list)
              }
              that.setData({
                accessList: list,
                pageNo: res.data.data.page.curPage + 1,
                totalPages: res.data.data.page.totalPages,
                accessLoading: false
              })
            }
          },
          fail: function (err) {
            console.log(err)
          }
        })
      }
    } else {
      that.setData({
        accessList: []
      })
    }
  },

 /**
   * 获取消费列表
   * param {userId, studentId, workNo, account,studentName, orgNo, departName, cardPlatformNo, cardPhysicsNo, status, indentity, departId,startDate, endDate, pageSize, pageNo}
   */
  getUserExpenseList: function (startDate, endDate) {
    const start = startDate.split('-')
    const end = endDate.split('-')
    const that = this
    const defaultStudent = wx.getStorageSync('defaultStudent')
    let param = defaultStudent
    param.pageSize = 10
    param.pageNo = 1
    param.start_date = `${start[0]}${start[1]}${start[2]}`
    param.end_date = `${end[0]}${end[1]}${end[2]}`
    wx.request({
      url: `${app.globalData.URL}app/user/getUserExpenseList`,
      method: 'POST',
      data: param,
      success: function(res) {
        if (res.data.code == 1) {
          if (res.data.data.length > 0) {
            res.data.data.forEach(item => {
              item.amount = (item.amount / 100).toFixed(2)
              item.trade_time = `${item.trade_time.substring(0, 4)}-${item.trade_time.substring(4, 6)}-${item.trade_time.substring(6, 8)} ${item.trade_time.substring(8, 10)}:${item.trade_time.substring(10, 12)}`
            })
            that.setData({
              expenseList: res.data.data
            })
          }
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (res) {
    const that = this
    if (that.data.navbarStatus == 2) {
      return false
    }
    that.setData({
      accessLoading: true
    })
    // 加载之前判断是否有更多多数据
    if (that.data.pageNo > that.data.totalPages) {
      that.setData({
        loadText: '暂无更多数据'
      })
    } else {
      that.setData({
        loadText: '加载更多'
      })
      that.getAccessList()
    }
  },

  // 时间处理

  Month: function(month) {
    const time = new Date()
    time.setDate(time.getDate())//获取Day天后的日期 
    var y = time.getFullYear()
    var m
    if(time.getMonth() + month + 1 > 12){
      y = y + 1;
      m = time.getMonth() + month - 11;//获取当前月份的日期 d
    } else {
      m = time.getMonth() + month + 1;//获取当前月份的日期 d
    }
    var d = time.getDate();
    const date = y + String((m > 9 ? m : '0' + m)) + String((d > 9 ? d : '0' + d)) + '235959'
    return date
    }
})
