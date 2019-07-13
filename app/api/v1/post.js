const Router = require('koa-router')
const {Success,NotFound}=require('../../../core/http-exception')
const {Auth}=require('../../../middlewares/auth')
const {Post}= require('../../models/blog_post')
const {Tag}=require('../../models/blog_tag')
const {PostValidator,PostIdValdiator}=require('../../validators/validator')
const {PostTag} =require('../../models/blog_post_tag')
const router = new Router({
  prefix:'/v1/post'
})
router.get('/list',async (ctx,next)=>{
  ctx.body=await Post.findAll()
})
router.get('/detail',async(ctx,next)=>{
  const v=await new PostIdValdiator().validate(ctx)
  const id=v.get('query.id')
  const post = await Post.findOne({
    where:{
      id:id
    }
  })
  throw new Success('查询成功',0,post)
})
router.post('/add',new Auth().m, async (ctx,next)=>{
  /**
   * 标题 内容 分类 标签
   */
  const uid =ctx.auth.uid
  const v= await new PostValidator().validate(ctx)
  const title= v.get('body.title')
  const content= v.get('body.content')
  const category_id=v.get('body.category_id')
  let tags=v.get('body.tags').split(',').map(tag=>parseInt(tag))
  const post=await Post.createPost(uid,content,title,category_id,tags)
  ctx.body=post
})
module.exports = router