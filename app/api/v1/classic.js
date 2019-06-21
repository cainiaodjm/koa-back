const Router = require('koa-router')
const { Flow } = require('../../models/flow')
const { Favor } = require('../../models/favor')
const router = new Router({
  prefix: '/v1/classic'
})
const { Auth } = require('../../../middlewares/auth')
const { HttpException, ParameterException, NotFound } = require('../../../core/http-exception')
const { PositiveIntegerValidator, LikeValidator } = require('../../validators/validator')
const { Art } = require('../../models/art')
router.get('/latest', new Auth().m, async (ctx, next) => {
  const uid = ctx.auth.uid
  const flow = await Flow.findOne({
    order: [
      ['index', 'DESC']
    ]
  })
  const art = await Art.getData(flow.art_id, flow.type)
  const isUserLike = await Favor.isUserLike(flow.art_id, flow.type, uid)
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', isUserLike ? '1' : "0")
  ctx.body = art
})
router.get('/:index/next', new Auth().m, async (ctx, next) => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'index'
  })
  const uid = ctx.auth.uid
  const index = v.get('path.index')
  const flow = await Flow.findOne({
    where: {
      index: index + 1
    }
  })
  if (!flow) {
    throw new NotFound('资源未找到')
  }
  const art = await Art.getData(flow.art_id, flow.type)
  const isUserLike = await Favor.isUserLike(flow.art_id, flow.type, uid)
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', isUserLike ? '1' : "0")
  ctx.body = art

})
router.get('/:index/previous', new Auth().m, async (ctx, next) => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'index'
  })
  const uid = ctx.auth.uid
  const index = v.get('path.index')
  const flow = await Flow.findOne({
    where: {
      index: index - 1
    }
  })
  if (!flow) {
    throw new NotFound('资源未找到')
  }
  const art = await Art.getData(flow.art_id, flow.type)
  const isUserLike = await Favor.isUserLike(flow.art_id, flow.type, uid)
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', isUserLike ? '1' : "0")
  ctx.body = art

})
router.get('/:type/:id/favor', new Auth().m, async (ctx, next) => {
  const v = await new LikeValidator().validate(ctx, {
    art_id: "id"
  })
  const uid = ctx.auth.uid
  const id = v.get('path.id')
  const type = v.get('path.type')


  const art = await Art.getData(id, type)
  if (!art) {
    throw new NotFound('资源未找到')
  }
  const isUserLike = await Favor.isUserLike(id, type, uid)
  ctx.body = {
    "fav_nums": art.fav_nums,
    "id": art.id,
    "like_status": isUserLike ? 1 : 0
  }

})
/**
 * 
 */
router.get('/favor', new Auth().m, async (ctx, next) => {
  const uid = ctx.auth.uid
  const arts=await Favor.getMyClassicFavors(uid)
  ctx.body=arts

})
module.exports = router