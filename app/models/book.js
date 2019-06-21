const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const {NotFound,AuthFaild}=require('../../core/http-exception')
const {Flow} =require('./flow')
class Book extends Model{

}
Book.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  type:{
    type:Sequelize.INTEGER,
    defaultValue:400
  },
  title:{
    type:Sequelize.STRING(128),
  },
  content:{
    type:Sequelize.TEXT,
  },
  image:{
    type:Sequelize.STRING,
    defaultValue:'https://www.test.com/default.jpg'
  },
  author:{
    type:Sequelize.STRING(128),
  },
  nationality:{
    type:Sequelize.INTEGER,
    defaultValue:1
  },
  press_name:{
    type:Sequelize.STRING(128),
  },
  press_date:{
    type:Sequelize.STRING(128),
  },
  page_count:{
    type:Sequelize.INTEGER,
  },
  price:{
    type:Sequelize.FLOAT,
  },
  paperback:{
    type:Sequelize.INTEGER,
    defaultValue:0
  }



},{
  sequelize,
  tableName:'tb_book',
})
Book.belongsTo(Flow,{foreignKey:'type_id'})

module.exports={Book}