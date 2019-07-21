const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const {PostTag}=require('./blog_post_tag')
const  {Post} =require('./blog_post')
const  moment  = require('moment')
class Tag extends Model{

}
Tag.init({
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true,
  },
  name:{
    type:Sequelize.STRING,
    allowNull:false
  },
  created_at: {
    type: Sequelize.DATE,
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  updated_at: {
    type: Sequelize.DATE,
    get() {
      return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss');
    }
  }
},{
  sequelize,
  tableName: 'tb_blog_tag',
})

module.exports={
  Tag
}
