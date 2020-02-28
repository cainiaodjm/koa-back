const Router = require('koa-router')
const {Success, NotFound} = require('../../../../core/http-exception')
const {Auth} = require('../../../../middlewares/auth')
const {Post} = require('../../../models/blog_post')
const {Tag} = require('../../../models/blog_tag')
const {PostValidator, PostIdValdiator, PageValidator} = require('../../../validators/validator')
const {PostTag} = require('../../../models/blog_post_tag')
const router = new Router({
    prefix: '/test/v1/post'
})
router.get('/list', async (ctx, next) => {
    const v = await new PageValidator().validate(ctx)
    console.log(v)
    const start = v.get('query.start')
    const count = v.get('query.count')
    const postList = await Post.getPostList(start, count)
    throw new Success('查询成功', 0, postList)

})
router.get('/detail', async (ctx, next) => {
    const v = await new PostIdValdiator().validate(ctx)
    const id = v.get('query.id')
    const post = await Post.findOne({
        where: {
            id: id
        },
        include: [
            {
                model:global.db.Tag,
                as:'tag',
            },
            {
                model: global.db.Category,
                as: 'category'
            },
            {
                model:global.db.Comment,
                as:"comment"
            }
        ]
    })
    throw new Success('查询成功', 0, post)
})
module.exports = router
