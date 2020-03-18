const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const bcrypt=require('bcryptjs')
class User extends Model{
}
User.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  roleId:{
      type:Sequelize.INTEGER,
      allowNull:true,
      comment:"关联角色",
      field:"role_id"
  },
  account:{
      type:Sequelize.STRING,
      allowNull:false,
      comment:"用户账号"
  },
  name:{
      type:Sequelize.STRING,
      allowNull:false,
      comment:"用户昵称"
  },
  password:{
    type:Sequelize.STRING,
    allowNull:false,
    comment:"用户密码"
  },
  type:{
      type:Sequelize.INTEGER,
      allowNull:false,
      comment:"用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加"
  },
  sex:{
      type:Sequelize.BOOLEAN,
      defaultValue:null,
      comment:"性别: 0:男 1:女"
  },
  avatar:{
      type:Sequelize.STRING,
      defaultValue:null,
      comment:"用户头像"
  },
  phone:{
    type:Sequelize.STRING(24),
    defaultValue:null,
    comment:"手机号"
  },
  wechat:{
    type:Sequelize.STRING(24),
    defaultValue:null,
    comment:"微信"
  },
  createUser:{
      type:Sequelize.INTEGER,
      defaultValue:null,
      field:"create_user"
  },
  flag:{
      type:Sequelize.BOOLEAN,
      defaultValue:1,
      allowNull:false,
      comment:"状态: 0：删除，1：可用(默认为1)"
  }


},{
  sequelize,
  tableName:'bbs_user',
})

module.exports={User}