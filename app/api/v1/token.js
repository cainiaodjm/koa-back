const  bcrypt=require('bcryptjs')
const Router = require('koa-router')
const {RegisterValidator,TokenValidator,NotEmptyValidator}=require('../../validators/validator')
const{LoginType} =require('../../lib/enum')
const {User}=require('../../models/user')
const {generateToken}=require('../../../core/util')
const {Success}=require('../../../core/http-exception')
const {Auth} =require('../../../middlewares/auth')
const {WXManager}=require('../../services/ws')
const router = new Router({
})

router.post('/v1/token/verify',async(ctx,next)=>{
  const v=await new NotEmptyValidator().validate(ctx)
  console.log(v.get('body.token'))
  const result= Auth.verifyToken(v.get('body.token'))
  throw new Success('验证成功',0,{
    data:result
  })
})
router.post('/v1/token',async (ctx,next)=>{ 
  let v=await new TokenValidator().validate(ctx)
 
  let token
  switch (v.get("body.type")) {
    case LoginType.USER_EMAIL :
      token= await emialLogin(v.get("body.account"),v.get("body.secret"))
      break;
    case LoginType.USER_MINI_PROGRAM:
      
      token= await WXManager.codeToToken(v.get('body.account'))
      break;
    default:
      break;
  }
  throw new Success("success",0,{
    token
  })
  
})
async function emialLogin(account,secret){
  //调用模型类
  const user=await  User.verifyEmailPassword(account,secret)
  return  generateToken(user.id,Auth.USER)
  
}

module.exports=router