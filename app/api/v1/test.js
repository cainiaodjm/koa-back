const Router = require('koa-router')
const {Success,NotFound}=require('../../../core/http-exception')
const {Auth}=require('../../../middlewares/auth')
// const {A}= require('../../models/test/a')
const router = new Router({
    prefix:'/v1/test'
})

router.get('/a', async (ctx, next) => {

    // ctx.body=global
    const  posts=await global.db.Post.findAll(
        {
            include:[
                {
                    model:global.db.Tag,
                    as:'tag',
                },
                {
                    model:global.db.Category,
                    as:'category'
                }
            ],
            limit:5,
            offset:0
        }
    );
    ctx.body=posts
})
module.exports = router
