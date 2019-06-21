const util = require('util')
const { wx } = require('../../config/config')
const axios = require('axios')
const { User } = require('../models/user')
const { AuthFaild } = require('../../core/http-exception')
const { Auth } = require('../../middlewares/auth')
const { generateToken } = require('../../core/util')

class WXManager {
  static async codeToToken(code) {

    //小程序 登录只需要一个code码
    const url = util.format(wx.loginUrl,
      wx.appID,
      wx.appSecret,
      code
    )

    const result = await axios.get(url)
    if (result.status !== 200) {
      throw new AuthFaild('openid获取失败')
    }
    const errcode = result.data.errcode


    if (errcode) {
      throw new AuthFaild('openid获取失败' + errcode)
    }
    let user = await User.getUserByOpenId(result.data.openid)
    if (!user) {
      user = await User.registerByOpenId(result.data.openid)
    }

    //获取到用户之后 返回权限token
    return generateToken(user.id, Auth.USER)

  }
}
module.exports = {
  WXManager
}