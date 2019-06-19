module.exports={
  environment:"dev",
  database:{
    dbName:'mini_program',
    host:'47.107.126.18',
    port:'13306',
    user:'root',
    password:'mysql_1024'
  },
  /**
   * jwt 配置
   */
  security:{
    secretKey:"cainiaodjm",
    expiresIn:60*60
  }
}