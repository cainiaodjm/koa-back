const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const {NotFound,AuthFaild}=require('../../core/http-exception')
class Role extends Model{

}
Role.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  name:{
    type:Sequelize.STRING(128),
    allowNull:false
  }

},{
  sequelize,
  tableName:'tb_role',
})
module.exports={Role}