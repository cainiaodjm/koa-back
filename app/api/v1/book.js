const  bcrypt=require('bcryptjs')
const Router = require('koa-router')

const {RegisterValidator,UserValidator,
  BookValidator,PositiveIntegerValidator,
  SearchValidator
}=require('../../validators/validator')
const {Book}= require('../../models/book')
const {HotBook}=require('../../models/hot_book')
const {Flow}=require('../../models/flow')
const {Success,NotFound}=require('../../../core/http-exception')
const {Auth}=require('../../../middlewares/auth')
const router = new Router({
  prefix:'/v1/book'
})

router.get('/:id/detail',async (ctx,next)=>{
  const v= await new PositiveIntegerValidator().validate(ctx)
  let id=v.get('path.id')
  let book=await new Book(id).detail()
  throw new Success("查询成功",0,{
    data:book
  })
})
router.get('/search',async (ctx,next)=>{
  const v=await new SearchValidator().validate(ctx)
  const res= await Book.search(v.get('query.q'),v.get('query.start'),v.get('query.count'))
  throw new Success("查询成功",0,{
    data:res
  })
})
router.get('/:book_id/favor',new Auth().m,async(ctx,next)=>{
  const v= await new PositiveIntegerValidator().validate(ctx,{
    id:"book_id"
  })
  const uid=ctx.auth.uid
  const res=await Book.getBookFavor(uid,v.get('path.book_id'))
  throw new Success('query success',0,{
    data:res
  })
})
router.get('/favor/count',new Auth().m, async(ctx,next)=>{
  const uid=ctx.auth.uid
  const count=await Book.getMyFavorBookCount(uid)
  throw new Success("查询成功",0,{
    data:count
  })
})
router.get('/hot_list',async (ctx,next)=>{
  ctx.body=await HotBook.getAll()
})

//添加书籍
router.post('/',async (ctx,next)=>{ 
  const v=await new BookValidator().validate(ctx)
  let title=v.get('body.title')
  let content=v.get('body.content')
  let author=v.get('body.author')
  let nationality=v.get('body.nationality')
  let press_name=v.get('body.press_name')
  let press_date=v.get('body.press_date')
  let page_count=v.get('body.page_count')
  let price=v.get('body.price')
  
  
  let paperback=v.get('body.paperback')
  const book={
    title,
    content,
    author,
    nationality,
    press_name,
    press_date,
    page_count,
    price,
    paperback
  }
  if(v.get('body.image')){
    book.image=v.get('body.image')
  }

  const _book=await Book.create(book)
  const flow={
    "type_id":_book.id,
    "type":_book.type,
  }
  //创建点赞记录 初始点赞记录为0
  await Flow.create(flow)
  throw new Success('','',{
    data:_book
  })
  
})
//获取热门书籍(概要)
router.get('/hot_list',async(ctx,next)=>{
  let books=await Book.findAll({
  })
  ctx.body=books
})
//增加短评
router.post('/add/short_comment',new Auth().m,(ctx,next)=>{
  
})

module.exports=router