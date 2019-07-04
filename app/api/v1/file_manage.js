const Router = require('koa-router')
const send=require('koa-send')
const {filePath}=require('../../../config/config')
const { FileManage } = require('../../models/file_manage')
const formidable = require('formidable')
const {FileListValidator,GetFileValidator}=require('../../validators/validator')
const {Success}=require('../../../core/http-exception')
const {put,list}=require('../../lib/oss')
const {Auth}=require('../../../middlewares/auth')
const router = new Router({
  prefix: '/v1/file'
})
router.get('/get_file_list', async (ctx, next) => {
  const v= await new FileListValidator().validate(ctx);
  const fileList=await FileManage.findAll()
  throw new Success('查询成功',0,fileList)
})
router.post('/upload_file',new Auth().m, async (ctx, next) => {
  const uid=ctx.auth.uid
  let info = await _saveFile(ctx)
  let filename=info.files.file.name.substring(0,info.files.file.name.lastIndexOf('.'))
  let res=await put(filename,info.files.file.path)
  info.files.file.oss_name=res.name
  info.files.file.oss_url=res.url
  let newFile=await FileManage.uploadFile(info.files.file,uid)
  if(newFile){
    throw new Success('上传成功',0,newFile)
  }
})
function _saveFile(ctx) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm()
    form.encoding = 'utf-8'
    form.uploadDir=filePath
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

    /**
     * 前端通过 key 和 type来获取文件
     * key是文件的唯一标识
     * 通过type来标识 用户是要下载还是预览
     */
    const v= await new GetFileValidator().validate(ctx)
    const key=v.get('body.key')
    const type=v.get('body.type')
    let fileInfo=await FileManage.findOne({
      where:{
        key
      }
    })
    if(!fileInfo){
      throw new Success('文件未找到',10006,{})
    }
    const {oss_url,path,file_name}=fileInfo
    if(!path) throw new Success("文件不存在","10006")
    switch (type) {
      case "download":
        // ctx.set({
        //   'Content-Type':'text/html',
        //   'Content-Dispositon':`attachment;filename=${encodeURI(file_name)}`
        // }).att
        ctx.attachment(path)
        await send(ctx,path)
        
        break;
    
      default:
        break;
    }
    throw new Success(0,'获取成功',{
      key,
      type
    })
})
module.exports = router