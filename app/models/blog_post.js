const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
const {Category}=require('./blog_category')
const {PostTag}=require('./blog_post_tag')
const {Tag}=require('./blog_tag')


const  moment  = require('moment')
class Post extends Model{

  static async getPostList(start, count) {
    let postIds=[]
    let posts=[]
    const postCount = await Post.findAll({
      attributes: [[Sequelize.fn('COUNT', '*'), 'count']],
    })

    const postList = await Post.findAll({
      offset: start,
      limit: count,
      order: [
        ['created_at', 'DESC']
      ],
      include:[
        {
          model:global.db.Tag,
          as:'tag',
        },
        {
          model:global.db.Category,
          as:'category'
        },
        // {
        //   model:global.db.Comment,
        //   as:"comment"
        // }
      ],
    })
    return {
      postList,
      count: postCount[0].dataValues.count
    }
  }

  static async createPost(author_id,content,title,summary,category_id,tags){
    const post= await Post.create({
      author_id,
      content,
      title,
      summary,
      category_id
    })
    let postId=post.get("id")
    for(let i=0;i<tags.length;i++){
      await PostTag.create({
        post_id:postId,
        tag_id:tags[i]
      })
    }
    return post
  }
}
Post.init({
  id:{
    type:Sequelize.UUID,
    defaultValue:Sequelize.UUIDV1,
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
  summary:{
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


module.exports={
  Post
}
