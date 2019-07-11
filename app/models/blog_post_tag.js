const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const  moment  = require('moment')
class PostTag extends Model{

}
PostTag.init({
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey:true,
  },
  post_id:{
    type:Sequelize.UUID,
  },
  tag_id:{
    type:Sequelize.INTEGER
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
  tableName: 'tb_blog_post_tag',
})

module.exports={
  PostTag
}