const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const {NotFound,AuthFaild}=require('../../core/http-exception')
class Magazine extends Model{

}
Magazine.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  type:{
    //对应条目的类型
    type:Sequelize.INTEGER
  },
  type_id:{
    //对应条目的id
    type:Sequelize.INTEGER
  },

  pubdate:{
    type:Sequelize.DATE
  }


},{
  sequelize,
  tableName:'tb_magazine',
})
module.exports={Magazine}