const Router = require('koa-router')
const {Success,NotFound}=require('../../../core/http-exception')
const {Auth}=require('../../../middlewares/auth')
const {Post}= require('../../models/blog_post')
const router = new Router({
  prefix:'/v1/post'
})
router.get('/list',async (ctx,next)=>{
  ctx.body=await Post.findAll()
})
router.post('/add',new Auth().m, async (ctx,next)=>{
  
})