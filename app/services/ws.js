const util =require('util')
const {wx}=require('../../config/config')
const axios=require('axios')
const {AuthFaild}=require('../../core/http-exception')
class WXManager{
  static async codeToToken(code){
    //小程序 登录只需要一个code码
    const url=util.format(wx.loginUrl,
      wx.appID,
      wx.appSecret,
      code
    )
    const result=await axios.get(url)
    if(result.status !==200){
      throw new AuthFaild('openid获取失败')
    }
    const errcode=result.data.errcode
    if(errcode!==0){
      throw new AuthFaild('openid获取失败'+errcode)
    }
    
  }
}