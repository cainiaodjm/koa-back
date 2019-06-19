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
      paranoid: true,
      createdAt: "create_at",
      // I want updatedAt to actually be called updateTimestamp
      updatedAt: 'update_at',
    
      // And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
      deletedAt: 'deleted_at',
    }
  }
)
sequelize.sync();
module.exports ={
  sequelize
}