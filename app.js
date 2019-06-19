const Koa=require('koa')
const parser = require('koa-bodyparser')
const InitManager=require('./core/init')
const catchError =require('./middlewares/exception')
const {logging} =require('./middlewares/logging')
const app=new Koa()
app.use(parser())
app.use(logging)
app.use(catchError)

InitManager.initCore(app)


app.listen(3000,()=>{
  console.log('监听------3000')
})
 