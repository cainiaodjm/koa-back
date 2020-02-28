const Router = require('koa-router')

const router = new Router({
    prefix: '/v1/comment'
})
const { Auth } = require('../../../middlewares/auth')
const { HttpException, ParameterException, NotFound,Success } = require('../../../core/http-exception')
const { PositiveIntegerValidator, LikeValidator,FlowValidator ,PageValidator} = require('../../validators/validator')
router.post('/add',new Auth().m,async(ctx,next)=>{
    /**
     * 添加一个评论
     *
     *  1.首先 获取当前评论的用户ID
     */

    const uid=ctx.auth.uid
    throw new Success("添加成功",0,result)
})
