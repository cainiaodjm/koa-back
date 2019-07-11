const Router = require('koa-router')
const {Success,NotFound}=require('../../../core/http-exception')
const {Auth}=require('../../../middlewares/auth')
const {Post}= require('../../models/blog_post')
const {Tag}=require('../../models/blog_tag')
const {PostValidator}=require('../../validators/validator')
const {PostTag} =require('../../models/blog_post_tag')
const router = new Router({
  prefix:'/v1/tag'
})
router.get('/list',async (ctx,next)=>{
   const tags=await Tag.findAll()
   throw new Success('查询标签成功',0,tags)
})
module.exports=router