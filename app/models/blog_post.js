const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const {Category}=require('./blog_category')
const  moment  = require('moment')
class Post extends Model{

}
Post.init({
  id:{
    type:Sequelize.UUID,
    defaultValue:function(){
      return Sequelize.UUIDV1
    },
    primaryKey:true,
  },
  author_id:{
    type:Sequelize.INTEGER,
    allowNull:false,
  },
  content:{
    type:Sequelize.TEXT,
    defaultValue:''
  },
  title:{
    type:Sequelize.STRING,
    allowNull:false
  },
  category_id:{
    type:Sequelize.INTEGER,
    allowNull:false,
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
    tableName: 'tb_blog_post',
})
Post.belongsTo(Category,{
  as:'categroy_id'
})

module.exports={
  Post
}
