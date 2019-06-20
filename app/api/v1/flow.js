const  bcrypt=require('bcryptjs')
const Router = require('koa-router')

const {RegisterValidator,UserValidator,BookValidator,FlowValidator}=require('../../validators/validator')
const {Flow}= require('../../models/flow')
const {UserFlow}= require('../../models/user_flow')
const {Success,NotFound}=require('../../../core/http-exception')
const {Auth}=require('../../../middlewares/auth')
const router = new Router({
  prefix:'/v1/flow'
})

// 对 对应类型的东西 点赞
router.post('/like/add',new Auth().m,  async (ctx,next)=>{ 
  const v=await new FlowValidator().validate(ctx)
  let type=v.get('body.type')
  let typeId=v.get('body.type_id')
  let uid=ctx.auth.uid
  let scope=ctx.auth.scope
  /**
   * 1.首先去user_flow表中根据user_id和type_id查 如果查到 则返回错误
   * 没查到 则添加记录
   * 并且向flow表对应type_id 中的点赞数+1
   */
   let userFlow=await UserFlow.getUserFlow(uid,typeId,type)
   let flowId=await Flow.addFavNumsByTypeIdAndType(typeId,type)
   //更新flow_id
   await UserFlow.updateFlowId(userFlow.id,flowId)
   userFlow.flow_id=flowId
   throw new Success('点赞成功',0,{
     "data":userFlow
   })
})
//取消点赞
router.post('/like/cancle',new Auth().m,async (ctx,next)=>{
  const v=await new FlowValidator().validate(ctx)
  let type=v.get('body.type')
  let typeId=v.get('body.type_id')
  let uid=ctx.auth.uid
  let res= await UserFlow.deleteUserFlow(uid,typeId,type)
  
  if(!res){
    throw new NotFound('删除失败')
  }
  let flowId= await Flow.reduceFavNumsByTypeIdAndType(typeId,type)
  if(flowId){
    throw new Success('取消点赞成功')
  }else{
    throw new NotFound('更新失败')
  }

})
module.exports=router