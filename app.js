const Koa=require('koa')
const cors = require('koa-cors');
const parser = require('koa-bodyparser')
const static=require('koa-static')
const fs=require('fs')
const path=require('path')
const https=require('https')
const http=require('http')
const InitManager=require('./core/init')



const catchError =require('./middlewares/exception')


const enforceHttps = require('koa-sslify');

const {logging} =require('./middlewares/logging')
const app=new Koa()
app.use(cors({
  // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
}))
app.use(parser())
app.use(logging)
app.use(catchError)
app.use(static(path.join(__dirname,'./static')))
InitManager.initCore(app)

// app.use(enforceHttps());

const option={
  key:fs.readFileSync('./config/https/2212554_www.cainiaodjm.top.key'),
  cert:fs.readFileSync('./config/https/2212554_www.cainiaodjm.top.pem')
}
http.createServer(app.callback()).listen(17100);
https.createServer(option, app.callback()).listen(17000);


// app.listen(17000,()=>{
//   console.log('监听------17000')
// })
// https.createServer(option,app.callback()).listen(17000,function(err){
//   console.log("https listening on port: 17000");
// })

 