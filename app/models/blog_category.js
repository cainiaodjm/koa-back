const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const  moment  = require('moment')
class Category extends Model{

}
Category.init({
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
  tableName: 'tb_blog_category',
})

module.exports={
  Category
}