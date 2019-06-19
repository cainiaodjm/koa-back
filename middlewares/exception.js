const {HttpException} =require('../core/http-exception')
const catchError =async (ctx,next)=>{
  try {
    
    await next()
  } catch (error) {
    const isHttpException=error instanceof HttpException
    const isDev=global.config.environment==='dev'
    if(isDev && !isHttpException){
      throw error;
    }
    if(isHttpException){
      //如果是HttpException类型 说明这个错误是我们在程序内部已经知道会抛出异常的错误
      let json={
        err_msg:error.errorMessage,
        err_code:error.errorCode,
        request :`${ctx.method} ${ctx.path}`
      }
      if(error.data){
        json.data=error.data
      }
      ctx.body=json
      
      //返回的Http状态码
      ctx.status=error.code
    }else{
      ctx.body={
        err_msg:'服务器内部错误',
        err_code:999,
        request :`${ctx.method} ${ctx.path}`
      }
      //返回的Http状态码
      ctx.status=500
    }
  }
}
module.exports=catchError