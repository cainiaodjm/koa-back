//为什么要继承Error呢  因为 我们要在api中抛出异常的话 必须是一个Error的类型
class HttpException extends Error{
  constructor(errorMessage='服务器异常',errorCode=10000,code=400){
    super();
    this.errorCode=errorCode;
    this.code=code;
    this.errorMessage=errorMessage
  }
}
class ParameterException extends HttpException{
  constructor(errorMessage,errorCode){
    super()
    this.code=400
    this.errorMessage=errorMessage || "参数错误"
    this.errorCode=errorCode || 10000
  }
}
class NotFound extends HttpException{
  constructor(errorMessage,errorCode){
    super()
    this.errorMessage=errorMessage || "404 NotFound"
    this.errorCode=errorCode || 10002
    this.code=404
  }
}
class AuthFaild extends HttpException{
  constructor(errorMessage,errorCode){
    super()
    this.errorMessage=errorMessage || "授权失败"
    this.errorCode=errorCode || 10004
    this.code=401
  }
}
class Success extends HttpException{
  constructor(errorMessage,errorCode,result){
    super()
    this.code=200
    this.result=result || {}
    this.errorMessage=errorMessage||'ok'
    this.errorCode=errorCode||0
  }
}
class Repeat extends HttpException{
  constructor(errorMessage,errorCode){
    super()
    this.errorMessage=errorMessage|| "重复操作"
    this.errorCode=errorCode || 60001
    this.code=200
  }
}
class Forbbiden extends HttpException{
  constructor(errorMessage,errorCode){
    super()
    this.errorMessage=errorMessage|| "禁止访问"
    this.errorCode=errorCode || 10006
    this.code=403
  }
}
module.exports={
  HttpException,
  ParameterException,
  Success,
  NotFound,
  AuthFaild,
  Forbbiden,
  Repeat
}