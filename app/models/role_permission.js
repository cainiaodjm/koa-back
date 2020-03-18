const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const {NotFound,AuthFaild}=require('../../core/http-exception')
class RolePermission extends Model{

}
UserRole.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  permissionId:{
    type:Sequelize.INTEGER,
    allowNull:false,
    field:"permission_id"
  },

},{
  sequelize,
  tableName:'tb_role_permission',
})
module.exports={RolePermission}