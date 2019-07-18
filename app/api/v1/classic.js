const Router = require('koa-router')
const { Flow } = require('../../models/flow')
const { Favor } = require('../../models/favor')
const router = new Router({
  prefix: '/v1/classic'
})
const { Auth } = require('../../../middlewares/auth')
const { HttpException, ParameterException, NotFound,Success } = require('../../../core/http-exception')
const { PositiveIntegerValidator, LikeValidator,FlowValidator ,PageValidator} = require('../../validators/validator')
const { Art } = require('../../models/art')
router.post('/add',new Auth().m,async(ctx,next)=>{
  const uid=ctx.auth.uid
  const v= await new FlowValidator().validate(ctx)
  const title =v.get('body.title')
  const content =v.get('body.content')
  const image=v.get('body.image')
  const type=v.get('body.type')
  const musicUrl=v.get('body.musicUrl')
  const pubdate=v.get('body.pubdate')
  const result=  await Flow.addFlow(title,content,type,image,musicUrl,pubdate)
  console.log(result)
  throw new Success("添加成功",0,result)
})
router.get('/oldest',new Auth().m,async(ctx,next)=>{
  const uid = ctx.auth.uid
  const flow = await Flow.findOne({
    order: [
      ['index', 'ASC']
    ]
  })
  const art = await Art.getData(flow.art_id, flow.type)
  const isUserLike = await Favor.isUserLike(flow.art_id, flow.type, uid)
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', isUserLike ? '1' : "0")
  throw new Success('获取成功',0,{
    data:art
  })
})
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
  throw new Success('获取成功',0,{
    data:art
  })
})
/**
 * 获取下一期期刊
 */
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
    throw new Success('没有下一期',1006,{})
  }
  const art = await Art.getData(flow.art_id, flow.type)
  const isUserLike = await Favor.isUserLike(flow.art_id, flow.type, uid)
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', isUserLike ? '1' : "0")
  throw new Success('获取成功',0,{
    data:art
  })

})
/**
 * 获取上一期 期刊
 */
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
    throw new Success('没有上一期',1006,{})
  }
  const art = await Art.getData(flow.art_id, flow.type)
  const isUserLike = await Favor.isUserLike(flow.art_id, flow.type, uid)
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', isUserLike ? '1' : "0")
  throw new Success('获取成功',0,{
    data:art
  })
})
/**
 * 获取所有期刊
 */
router.get('/list',async (ctx,next)=>{
  const v=await new PageValidator().validate(ctx)
  const start=v.get('query.start')
  const count=v.get('query.count')
  
  const flows=await Flow.list(start,count)
  throw new Success('查询成功',0,flows)
})
/**
 * 获取某一期的详细信息
 */
router.get('/:type/:id',new Auth().m,async (ctx,next)=>{
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
  art.setDataValue('like_status',isUserLike ? 1 : 0)
  ctx.body = art

})
/**
 * 获取点赞信息
 */
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
  const res=await Art.getList(arts)
  throw new Success('查询成功',0,res)
})
module.exports = router