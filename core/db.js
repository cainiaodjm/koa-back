const Sequelize =require('sequelize')
const {
  dbName,
  host,
  port,
  user,
  password
}=require('../config/config').database
const sequelize=new Sequelize(dbName,user,password,{
    dialect:'mysql',
    host,
    port,
    logging:true,
    timezone:'+08:00',
    define:{
      //如果paranoid选项为true，则不会删除对象，而是将deletedAt列设置为当前时间戳。要强制删除，可以传递force: true给destroy调用：
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      scopes:{
        bh:{
          attributes:{
            exclude:[
              'updated_at',
              'deleted_at',
              'created_at'
            ]
          }
        }
      }
    }
  }
)

sequelize.sync();
module.exports ={
  sequelize
}
