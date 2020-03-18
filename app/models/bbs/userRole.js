const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const bcrypt=require('bcryptjs')
class UserRole extends Model{
}
UserRole.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  roleId:{
      type:Sequelize.INTEGER,
      allowNull:false,
      comment:"关联角色Id",
      field:"role_id"
  },
  userId:{
    type:Sequelize.INTEGER,
    allowNull:false,
    comment:"关联用户Id",
    field:"user_id"
  }


},{
  sequelize,
  tableName:'bbs_user_role',
})

module.exports={UserRole}