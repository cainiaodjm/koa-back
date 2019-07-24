const {sequelize}=require('../../../core/db')
const {Sequelize,Model}=require('sequelize')
const  moment  = require('moment')
class Comment extends Model{
}
Comment.init({
  id:{
    type:Sequelize.UUID,
    defaultValue:Sequelize.UUIDV1,
    primaryKey:true
  },
    parent_id:{
    type:Sequelize.UUID,
  },
  comment_text:{
    type:Sequelize.STRING,
  },
  comment_user_id:{
    type:Sequelize.INTEGER,
  },
  comment_user_name:{
    type:Sequelize.STRING
  },
  to_user_id:{
    type:Sequelize.INTEGER,
  },
  to_user_name:{
    type:Sequelize.STRING
  },
  post_id:{
    type:Sequelize.STRING
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
  tableName: 'tb_comment',
})

module.exports={
  Comment
}