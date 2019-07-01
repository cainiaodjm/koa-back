const OSS =require('ali-oss')
const client= new OSS({
  region:'oss-cn-beijing',
  accessKeyId:"LTAI4Hor5P1itsLt",
  accessKeySecret:"EKzYbRoqnJzkAcD5Wg9QPAuSRpMK9h",
  bucket:"cainiaodjm"
})
async function put(objectName,localFile){
  try {
    ///file_manage/2019/6/30
    let result = await client.put('file_manage/2019/'+objectName, localFile);
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
  put,list
}