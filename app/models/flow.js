const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const {NotFound,AuthFaild}=require('../../core/http-exception')
class Flow extends Model{
  static async reduceFavNumsByTypeIdAndType(type_id,type){
    let flow=await Flow.findOne({
      where:{
        type_id:type_id,
        type:type
      }
    })
    if(!flow){
      throw new NotFound('资源未找到')
    }
    let favNums=flow.fav_nums-1
    await flow.update({
      fav_nums:favNums
    },{
      where:{
        type_id:type_id,
        type:type
      }
    })
    return flow.id

  }
  static async addFavNumsByTypeIdAndType(type_id,type){
    let flow=await Flow.findOne({
      where:{
        type_id:type_id,
        type:type
      }
    })
    if(!flow){
      throw new NotFound('资源未找到')
    }
    let favNums=flow.fav_nums+1
    await flow.update({
      fav_nums:favNums
    },{
      where:{
        type_id:type_id,
        type:type
      }
    })

    return flow.id
  }
}
Flow.init({
  index:Sequelize.INTEGER,
  art_id:Sequelize.INTEGER,
  type:Sequelize.INTEGER,
},{
  sequelize,
  tableName:'tb_flow',
})
module.exports={Flow}