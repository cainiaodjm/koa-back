const fs= require('fs')
const logging=async (ctx,next)=>{
  const path=ctx.path
  const params=ctx.params
  const method=ctx.method
  const query=ctx.request.query

  const headers=ctx.request.headers 

  const body=ctx.request.body
  console.log(`${method}:${path}`)
  await next()
}
module.exports={
  logging
}