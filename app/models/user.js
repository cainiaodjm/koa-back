const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const {FileManage}=require('./file_manage')
const {NotFound,AuthFaild}=require('../../core/http-exception')
const bcrypt=require('bcryptjs')
class User extends Model{
  static async getUserFiles(uid){
     const user=await User.findByPk(uid)
     const files=await user.getFiles()
     return files
  }
  static async verifyEmailPassword(email,plainPassword){
    const user= await User.findOne({
      where:{
        email:email
      }
    })
    if(!user){
      throw new AuthFaild("账号不存在")
    }
    const correct=bcrypt.compareSync(plainPassword,user.password)
    if(!correct){
      throw new AuthFaild("密码不正确")
    }
    return user
  }
  static async getUserByEmail(email){
    const user =await User.findOne({
      where:{
        email:email
      }
    })
    return user
  }
  static async getUserByParams(params){
    
    const user =await User.findOne({
      where:params
    })
    return user
  }
  static async getUserByOpenId(openid){
    const user=await User.findOne({
      where:{
        openid:openid
      }
    })
    return user
  }
  static async registerByOpenId(openid){
    return await User.create({
      openid
    })
  }
}
User.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  nickname:Sequelize.STRING,
  email:{
    type:Sequelize.STRING(128),
    unique:true
  },
  password:{
    type:Sequelize.STRING,
    set(val){
      const salt=bcrypt.genSaltSync(10)
      const psw=bcrypt.hashSync(val,salt)
      this.setDataValue('password',psw)
    }
  },
  openid:{
    type:Sequelize.STRING(64),
    unique:true
  }
},{
  sequelize,
  tableName:'tb_user',
})
User.hasMany(FileManage,{
  as:"files",
  foreignKey:'user'
})
module.exports={User}