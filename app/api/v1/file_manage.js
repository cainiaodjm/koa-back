const Router = require('koa-router')
const {filePath}=require('../../../config/config')
const { FileManage } = require('../../models/file_manage')
const formidable = require('formidable')
const {FileListValidator}=require('../../validators/validator')
const {put,list}=require('../../lib/oss')
const router = new Router({
  prefix: '/v1/file'
})
router.get('/get_file_list', async (ctx, next) => {
  const v= await new FileListValidator().validate(ctx);
  const res=await list(v.get('body.prefix'),v.get('body.marker'))
  let objects=res.objects || []
  ctx.body=objects
})
router.post('/upload_file', async (ctx, next) => {
  
  let info = await _saveFile(ctx)
  console.log(info)
  console.log(info.files.file.name)
  let filename=info.files.file.name.substring(0,info.files.file.name.lastIndexOf('.'))
  let res=await put(filename,info.files.file.path)
  ctx.body=res
  // ctx.body = info

})
function _saveFile(ctx) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm()
    console.log(form.uploadDir)
    console.log(filePath)
    form.encoding = 'utf-8'
    form.uploadDir=filePath
    console.log(form.uploadDir)
    //设置文件的保存路径
    form.keepExtensions = true
    form.parse(ctx.req, (err, fileds, files) => {
      //fileds 是表单中对应的name
      if (err) {
       
        reject(err)
      }
      resolve({
        fileds,
        files
      })
    })
  })
}
router.post('/delete_file', async (ctx, next) => {

})
router.get('/get_file', async (ctx, next) => {

})
module.exports = router