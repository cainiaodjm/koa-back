const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const axios=require('axios')
const util=require('util')
const {Favor}=require('./favor')
const {NotFound,AuthFaild}=require('../../core/http-exception')
const config=require('../../config/config')
class Book extends Model{
  // constructor(id){
  //   super()
  //   this.id=id
  // }
  
  async detail (id){
    const url=util.format(config.yushu.detailUrl,this.id)
    const detail=await axios.get(url)
    return detail.data
  }
  

  static async getBookFavor(uid,bookId){
      const fav_nums=await Favor.count({
        where:{
          art_id:bookId,
          type:400

        }
      })
      const state=await Favor.findOne({
        where:{
          uid,
          art_id:bookId,
          type:400
        }
      })
      let like_status=0
      if(state){
        like_status=1
      }
      return {
        like_status,
        fav_nums,
        id:bookId
      }
  }
  static async getMyFavorBookCount(uid){
    /**
     * SELECT COUNT(*) FROM tb_favor WHERE type='400' AND uid='2'
     */
    const count=await Favor.count({
      where:{
        type:400,
        uid
      }
    })
    return count
  }
  static async search(q,start,count,summary=1){
    const url=util.format(config.yushu.keywordUrl,encodeURI(q), count, start, summary)
    const res=await axios.get(url)

    return res.data
  }
}

Book.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
  },
  fav_nums:{
    type:Sequelize.INTEGER,
    defaultValue:0
    
  }




},{
  sequelize,
  tableName:'tb_book',
})

module.exports={Book}