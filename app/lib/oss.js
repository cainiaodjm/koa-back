const OSS =require('ali-oss')
const {getFilePathByTime} =require('../../core/util')
const client= new OSS({
  region:'oss-cn-beijing',
  accessKeyId:"LTAI4Hor5P1itsLt",
  accessKeySecret:"EKzYbRoqnJzkAcD5Wg9QPAuSRpMK9h",
  bucket:"cainiaodjm"
})

async function getFileUrl(objectName){
  return client.signatureUrl(objectName,{expires:3600*2})
}

async function getFileSteam(objectName){
  try {
    let result = await client.getStream(objectName);
    return result
    // let writeStream = fs.createWriteStream('local-file');
    // result.stream.pipe(writeStream);
  } catch (e) {
    console.log(e);
  }
}

// async function downloadByStream(objectName,)
async function put(objectName,localFile){
  console.log(objectName,'filename')
  try {
    let path=getFilePathByTime(objectName)
    console.log(path)
    let result = await client.put(path, localFile);
    return result
  } catch (error) {
    console.log(error);
  }
}
/**
 * 文件路径区间
 * @param {*} prefix  // 列举前缀为'my-'的文件。
 * @param {*} marker   // 列举前缀为'my-'且在'my-object'之后的文件。
 */
async function list(prefix,marker) {
  console.log(prefix)
  try {
    if(!prefix && !marker){
      let result=await client.list()  
      return result
    }else if(!marker){
      let result=await client.list({
        prefix
      })  
      return result
    }else{
      let result = await client.list({
        prefix,
        marker
     });
     return result
    }
  } catch (error) {
    console.log(error)
  }
  
  
}
module.exports={
  put,list,
  getFileUrl,
  getFileSteam
}