const Koa=require('koa')
const parser = require('koa-bodyparser')
const InitManager=require('./core/init')
const https=require('https')
const http=require('http')
const fs=require('fs')
const catchError =require('./middlewares/exception')

const enforceHttps = require('koa-sslify');

const {logging} =require('./middlewares/logging')
const app=new Koa()
app.use(parser())
app.use(logging)
app.use(catchError)

InitManager.initCore(app)

// app.use(enforceHttps());

const option={
  key:fs.readFileSync('./config/https/2212554_www.cainiaodjm.top.key'),
  cert:fs.readFileSync('./config/https/2212554_www.cainiaodjm.top.pem')
}
// http.createServer(app.callback()).listen(17000);
https.createServer(option, app.callback()).listen(17000);


// app.listen(17000,()=>{
//   console.log('监听------17000')
// })
// https.createServer(option,app.callback()).listen(17000,function(err){
//   console.log("https listening on port: 17000");
// })

 