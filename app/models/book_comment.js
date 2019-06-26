const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')
class BookComment extends Model{
  static async getComment(bookId){
    const bookComments=await BookComment.findAll({
      where:{
        book_id:bookId
      }
    })
    if(bookComments){
      return bookComments
    }else{
      return []
    }
  }
  static async addComment(bookId,content){
    const bookComment=await BookComment.findOne({
      where:{
        book_id:bookId,
        content
      }
    })
    if(!bookComment){
      return await BookComment.create({
        book_id:bookId,
        content,
        nums:1
      })
    }else{
     return await bookComment.increment('nums',{
       by:1
     })
    }
  }
}
BookComment.init({
  content:Sequelize.STRING,
  nums:{
    type:Sequelize.INTEGER,
    defaultValue:0
  },
  book_id:Sequelize.INTEGER
},{
  sequelize,
  tableName:'book_comment'
})
module.exports={
  BookComment
}