const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const {NotFound,AuthFaild}=require('../../core/http-exception')
class Music extends Model{

}
Music.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  type:{
    type:Sequelize.INTEGER,
    defaultValue:100
  },
  title:{
    type:Sequelize.STRING(128),
  },
  content:{
    type:Sequelize.STRING(128)
  },

},{
  sequelize,
  tableName:'tb_music',
})
module.exports={Music}