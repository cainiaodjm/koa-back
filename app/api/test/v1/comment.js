const Router = require('koa-router')
const {Success, NotFound} = require('../../../../core/http-exception')
const {Auth} = require('../../../../middlewares/auth')
const {Post} = require('../../../models/blog_post')
const {Tag} = require('../../../models/blog_tag')
const {PostValidator, PostIdValdiator, PageValidator} = require('../../../validators/validator')
const {PostTag} = require('../../../models/blog_post_tag')
const router = new Router({
    prefix: '/v1/test/comment'
})
router.get('/add', async (ctx, next) => {
    // const v = await new PageValidator().validate(ctx)
    // console.log(v)
    // const start = v.get('query.start')
    // const count = v.get('query.count')
    // const postList = await Post.getPostList(start, count)
    // throw new Success('查询成功', 0, postList)

})
