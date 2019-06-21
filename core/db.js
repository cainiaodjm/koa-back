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
      createdAt: "created_at",
      // I want updatedAt to actually be called updateTimestamp
      updatedAt: 'updated_at',
    
      // And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
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