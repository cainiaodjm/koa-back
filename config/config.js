const path=require('path')
module.exports = {
  environment: "dev",
  database: {
    dbName: 'mini_program',
    host: '47.107.126.18',
    port: '13306',
    user: 'root',
    password: 'mysql_1024'
  },
  /**
   * jwt 配置
   */
  security: {
    secretKey: "cainiaodjm",
    expiresIn: 60 * 60
  },
  wx: {
    appID: 'wxfe8525810bdf490f',
    appSecret: '31d9eb4961bc722f5f6508bf1396d763',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  },
  yushu: {
    detailUrl: 'http://t.yushu.im/v2/book/id/%s',
    keywordUrl: 'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
  },
  filePath:path.join(__dirname,'../../','file_storage')
}