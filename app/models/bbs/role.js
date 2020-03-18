const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const bcrypt=require('bcryptjs')
class Role extends Model{
}
Role.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  pId:{
      type:Sequelize.INTEGER,
      allowNull:false,
      comment:"父Id",
      field:"p_id"
  },
  name:{
      type:Sequelize.STRING,
      allowNull:false,
      comment:"角色名称"
  },
  columns:{
      type:Sequelize.INTEGER,
      defaultValue:1,
      comment:"专栏数量, -1为无限"
  },
  users:{
    type:Sequelize.INTEGER,
    defaultValue:10,
    comment:"可创建多少个用户, -1为无限"
  },
  desc:{
      type:Sequelize.STRING,
  },
  status:{
      type:Sequelize.BOOLEAN,
      allowNull:false,
      defaultValue:true,
      comment:"状态: 0：停用，1：启用(默认为1)"
  },
  createUser:{
      type:Sequelize.INTEGER,
      defaultValue:null,
      field:"create_user"
  },
  updateUser:{
    type:Sequelize.INTEGER,
    defaultValue:null,
    field:"update_user"
  },
  deleteUser:{
    type:Sequelize.INTEGER,
    defaultValue:null,
    field:"delete_user"
  },
  flag:{
    type:Sequelize.BOOLEAN,
    defaultValue:1,
    allowNull:false,
    comment:"状态: 0：删除，1：可用(默认为1)"
}

},{
  sequelize,
  tableName:'bbs_role',
})

module.exports={Role}