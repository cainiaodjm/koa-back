const validator=require('validator')
const {get,last,set,cloneDeep}=require('lodash')

class GlobalValidator {
  constructor(){
    this.data={}
    this.parsed={}
  }
  _assembleAllParams(ctx){
    return {
      body:ctx.request.body,
      query:ctx.request.query,
      path:ctx.params,
      header:ctx.request.header
    }
  }
  async validate(ctx,alias={}){
    this.alias=alias
    let params =this._assembleAllParams(ctx)
    this.data=cloneDeep(params)
    this.parsed=cloneDeep(params)


    const errorMsgs=[
      
    ]

  }

}