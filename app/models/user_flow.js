const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const {NotFound,AuthFaild,Repeat }=require('../../core/http-exception')
class UserFlow extends Model{

  static async updateFlowId(id,flow_id){
    let result=await UserFlow.update({
      flow_id:flow_id
    },{
      where:{
        id:id
      }
    })
    if(result>0){
      return true
    }else{
      return false
    }
    
  }
  static async deleteUserFlow(uid,type_id,type){
    let userFlow= await UserFlow.findOne({
      where:{
        user_id:uid,
        type_id:type_id,
        type:type
      }
    })
    if(!userFlow){
      throw new Repeat('没有点赞哦 不能取消点赞哦')
    }
    let result= await UserFlow.destroy({
      where:{
        user_id:uid,
        type_id:type_id,
        type:type
      },
      force:true
      
    })
    if(result>0){
      return true
    }else{
      return false
    }
    

  }
  static async getUserFlow(uid,type_id,type){
    
    let userFlow= await UserFlow.findOne({
      where:{
        user_id:uid,
        type_id:type_id,
        type:type
      }
    })
    if(userFlow){
      throw new Repeat('已经点赞了哦 不要重复点赞')
    }
    userFlow=await UserFlow.create({
      user_id:uid,
      type_id:type_id,
      type:type
    })
    return userFlow
  }
}
UserFlow.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  type_id:{
    type:Sequelize.INTEGER
  },
  type:{
    type:Sequelize.INTEGER
  },
  user_id:{
    type:Sequelize.INTEGER
  },
  flow_id:{
    type:Sequelize.INTEGER,
  },


},{
  sequelize,
  tableName:'tb_user_flow',
})
module.exports={UserFlow}