const Router = require('koa-router')
const router = new Router({
  prefix:'/v1/classic'
})
const{Auth}=require('../../../middlewares/auth')
const {HttpException,ParameterException} = require('../../../core/http-exception')
const {PositiveIntegerValidator} =require('../../validators/validator')

router.get('/latest',new Auth().m, async (ctx, next) => {

  // const v= await new PositiveIntegerValidator().validate(ctx)
  ctx.body=ctx.auth.scope
  // ctx.body = {
  //   "content": "人生不能像做菜，把所有的料准备好才下锅",
  //   "fav_nums": 0,
  //   "id": 1,
  //   "image": "http://127.0.0.1:5000/images/movie.7.png",
  //   "index": 7,
  //   "like_status": 0, 
  //   "pubdate": "2018-06-22",
  //   "title": "李安<<饮食男女>>",
  //   "type": 100
  // }
})
module.exports=router