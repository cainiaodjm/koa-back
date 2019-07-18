const Router = require('koa-router')
const {Success,NotFound}=require('../../../core/http-exception')
const {Auth}=require('../../../middlewares/auth')
const {Favor}=require('../../models/favor')
const {LikeValidator}=require('../../validators/validator')
const router = new Router({
  prefix:'/v1/like'
})
router.post('/',new Auth().m, async(ctx,next)=>{
  const v= await new  LikeValidator().validate(ctx)
  const uid=ctx.auth.uid
  await Favor.like(v.get('body.art_id'),v.get('body.type'),uid)
  throw new Success('点赞成功',0)
} )
router.post('/cancle',new Auth().m, async(ctx,next)=>{
  const v= await new  LikeValidator().validate(ctx)
  const uid=ctx.auth.uid
  await Favor.dislike(v.get('body.art_id'),v.get('body.type'),uid)
  throw new Success('取消点赞成功',0)
})
module.exports=router