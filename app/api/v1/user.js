const  bcrypt=require('bcryptjs')
const Router = require('koa-router')

const {RegisterValidator}=require('../../validators/validator')
const {User}= require('../../models/user')
const {Success}=require('../../../core/http-exception')
const router = new Router({
  // prefix:'v1/user'
})

router.post('/v1/user/register',async (ctx,next)=>{ 
  const v=await new RegisterValidator().validate(ctx)

  const user={
    email:v.get('body.email'),
    password:v.get('body.password'),
    nickname:v.get('body.nickname')
  }
  const r= await User.create(user)

  // success.data=user
  throw new Success('','',r)
  
})
router.post('/v1/user/:id',async(ctx,netx)=>{
  ctx.body={
    "err_msg":"success"
  }
})
module.exports=router