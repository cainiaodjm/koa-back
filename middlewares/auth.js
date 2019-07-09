const basicAuth=require('basic-auth')
const {Forbbiden}=require('../core/http-exception')
const {security}=require('../config/config')
const jwt=require('jsonwebtoken')
class Auth{
  constructor(level){ 
    this.level=level || 1
    //类变量来定义权限数字
    Auth.USER=8
    Auth.ADMIN=16
    Auth.SUPER_ADMIN=32
  }
  get m(){
    return async(ctx,next)=>{
      //token 检测
      //token 需要前端传递
      //HTTP 规定  身份验证机制 HttpBasicAuth
      //ctx.req获取的是nodejs原生的request  ctx.request 是koa封装的request

      const userToken=basicAuth(ctx.req)
      let errMsg="token不合法"
      if(!userToken || !userToken.name){
        throw new Forbbiden(errMsg)
      }
      try {
        var decode= jwt.verify(userToken.name,security.secretKey)
      } catch (error) {
        //这里需要给前端明确的错误提示
        if(error.name == 'TokenExpiredError'){
          errMsg="token已过期"
        }
        throw new Forbbiden(errMsg)
      }
      if(decode.scope <this.level){
        errMsg="权限不足"
        throw new  Forbbiden(errMsg)
      }
      ctx.auth={
        uid:decode.uid,
        scope:decode.scope
      }
      await next()

    }
  }
  static  verifyToken(token){
    try {
      jwt.verify(token  ,security.secretKey)
      return true
    } catch (error) {
      return false
    }
    
  }
}
module.exports={
  Auth
}