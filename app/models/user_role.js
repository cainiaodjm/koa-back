const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const {NotFound,AuthFaild}=require('../../core/http-exception')
class UserRole extends Model{

}
UserRole.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  userId:{
    type:Sequelize.INTEGER,
    allowNull:false,
    field:"user_id"
  },
  roleId:{
      type:Sequelize.INTEGER,
      allowNull:false,
      field:"role_id"
  }


},{
  sequelize,
  tableName:'tb_user_role',
})
module.exports={UserRole}