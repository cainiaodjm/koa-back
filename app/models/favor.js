const {sequelize}=require('../../core/db')
const {Sequelize,Model,Op}=require('sequelize')
const {Repeat,NotFound}=require('../../core/http-exception')

const {Art}=require('./art')
class Favor extends Model{
  /**
   * 
   * @param {*} uid 
   * 这个函数返回的是我喜欢的期刊 不包含图书的信息
   */
  static async getMyClassicFavors(uid){
    const arts= await Favor.scope('bh').findAll({
      where:{
        uid,
        type:{
          [Op.not]:400
        }
      }
    })
    if(!arts){
      throw new NotFound('资源未找到')
    }
    
    return arts
  }
  static async like(art_id,type,uid){
    const favor=await Favor.findOne({
      where:{
        art_id,
        type,
        uid
      }
    })
    if(favor){
      throw new Repeat('你已经点过赞了')
    }
    //开启事务
    return  sequelize.transaction( async t=>{
      await Favor.create({
        art_id,
        type,
        uid
      },{transaction:t})
      const art = await Art.getData(art_id,type,false)
      
      await art.increment('fav_nums',{by:1,transaction:t})
    })
  }
  static async isUserLike(art_id,type,uid){
    const favor=await Favor.findOne({
      where:{
        art_id,
        type,
        uid
      }
    })
    return favor ? true :false
  }
  static async dislike(art_id,type,uid){
    const favor=await Favor.findOne({
      where:{
        art_id,
        type,
        uid
      }
    })
    if(!favor){
      throw new Repeat('你已经取消过点赞了')
    }
    //开启事务
    return  sequelize.transaction( async t=>{
      await favor.destroy({
        force:true,
        transaction:t
      })
      const art = await Art.getData(art_id,type,false)
      console.log(art)
      await art.decrement('fav_nums',{by:1,transaction:t})
    })
  }
}
Favor.init({
  uid:Sequelize.INTEGER,
  art_id:Sequelize.INTEGER,
  type:Sequelize.INTEGER
},{
  sequelize,
  tableName:'tb_favor',
})
module.exports={
  Favor
}