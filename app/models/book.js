const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const axios=require('axios')
const util=require('util')
const {NotFound,AuthFaild}=require('../../core/http-exception')
const config=require('../../config/config')
class Book extends Model{
  constructor(id){
    super()
    this.id=id
  }
  async detail (id){
    const url=util.format(config.yushu.detailUrl,this.id)
    const detail=await axios.get(url)
    return detail.data
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