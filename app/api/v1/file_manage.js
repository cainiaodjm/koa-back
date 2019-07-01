const Router = require('koa-router')
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
  const form = new formidable.IncomingForm()
  form.encoding = 'utf-8'
  let info = await _saveFile(ctx)
  console.log(info.files.file.name,info.files.file.path)
  let res=await put(info.files.file.name,info.files.file.path)
  ctx.body=res
  // ctx.body = info

})
function _saveFile(ctx) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm()
    console.log(form.uploadDir)
    form.encoding = 'utf-8'
    //设置文件的保存路径
    form.keepExtensions = true
    form.parse(ctx.req, (err, fileds, files) => {
      //fileds 是表单中对应的name
      if (err) {
        console.log(err)
        reject(err)
      }
      console.log()
      // let file=files[Object.keys(files)[0]]
      // const info=JSON.parse(JSON.stringify(file))
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