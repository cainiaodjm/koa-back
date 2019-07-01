const OSS =require('ali-oss')
const client= new OSS({
  accessKeyId:"LTAI4Hor5P1itsLt",
  accessKeySecret:"EKzYbRoqnJzkAcD5Wg9QPAuSRpMK9h",
  bucket:"cainiaodjm"
})
async function listBuckets() {
  try {
    let res=await client.listBuckets()
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
async function put(){
  try {
    let result = await client.put('test-sa', 'local-file');
    console.log(result)
  } catch (error) {
    console.log(error);
  }
}
async function list (){
  try {
    let result=await client.list({
      // 'max-keys': 5
    })
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}
// list()
put()