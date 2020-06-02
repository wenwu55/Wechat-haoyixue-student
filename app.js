//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力

    const that = this
    // 登录
    wx.checkSession({
      success(e) {
        wx.login({
          success(res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                url: that.globalData.URL + "miniProgram/getOpenId",
                method: "POST",
                data: {
                  appId: 'wx1ef8ee2b4fe4f910',
                  secret: 'c728a5b1c2045b909955425712643648',
                  js_code: res.code,
                  type: 1
                },
                success(response) {
                  wx.setStorageSync("openid", response.data.data.openid)
                  wx.setStorageSync("unionid", response.data.data.unionid)
                  wx.setStorageSync("session_key", response.data.data.session_key)
                  wx.setStorageSync("userId", response.data.data.userId)
                  wx.setStorageSync("phone", response.data.data.phone)
                  wx.setStorageSync("roleId", response.data.data.role)
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      },
      fail(e) {
        wx.login({
          success(res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                url: that.globalData.URL + "miniProgram/getOpenId",
                method: "POST",
                data: {
                  appId: 'wx1ef8ee2b4fe4f910',
                  secret: 'c728a5b1c2045b909955425712643648',
                  js_code: res.code,
                  type: 1
                },
                success(response) {
                  wx.setStorageSync("openid", response.data.data.openid)
                  wx.setStorageSync("unionid", response.data.data.unionid)
                  wx.setStorageSync("session_key", response.data.data.session_key)
                  wx.setStorageSync("userId", response.data.data.userId)
                  wx.setStorageSync("phone", response.data.data.phone)
                  wx.setStorageSync("roleId", response.data.data.role)
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // 设置默认学生
    let userId = wx.getStorageSync('userId')
    let defaultStudent = wx.getStorageSync('defaultStudent')
    if (!defaultStudent && userId) {
      // 设置默认学生
      wx.request({
        url: 'https://duchengedu.com/wechatHyx/app/user/getChildrenByUser?userId=' + userId,
        method: 'POST',
        success: function (res) {
          if (res.data.code === 1) {
            // 没有的话把列表第一项当默认的并存入缓存
            defaultStudent = res.data.data[0]
            wx.setStorageSync('defaultStudent', defaultStudent)
          }
        }
      })
    }

  },
  globalData: {
    userInfo: null,
    defaultStudent: {},
    // URL: 'http://192.168.0.176:9666/'
    URL: 'https://duchengedu.com/wechatHyx/'
  }
})