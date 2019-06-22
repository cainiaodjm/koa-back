const {sequelize}=require('../../core/db')
const {Sequelize,Model,Op}=require('sequelize')
const {Favor}=require('./favor')
class HotBook extends Model{
  static _getEachBook(book,favors){
    let count=0;
    favors.forEach((item)=>{
      if(book.id===item.art_id){
        count=item.get('count')
      }
    })
    book.setDataValue('fav_nums',count)
    return book
  }
  static async getAll(){
    /**SELECT art_id ,count(*) FROM tb_favor WHERE art_id in (SELECT id FROM tb_hotbook ORDER BY `index` ) GROUP BY art_id */
    const books= await HotBook.findAll({
      limit:20,
      order:['index']
      
    })
    let ids=[]
    books.forEach((item)=>{
      ids.push(item.id)
    })
    let favors= await Favor.findAll({
      where:{
        art_id:{
          [Op.in]:ids
        },
        type:400
      },
      
      attributes:['art_id', [Sequelize.fn('COUNT','*'),'count']],
      group:[
        'art_id'
      ]
        
      
    })

   
    books.forEach((book)=>{
      HotBook._getEachBook(book,favors)
    })
    return books



  }
}
HotBook.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  index:{
    //排序字段
    type:Sequelize.INTEGER
  },
  image:{
    //对应条目的id
    type:Sequelize.STRING
  },

  author:{
    type:Sequelize.STRING
  },
  title:{
    type:Sequelize.STRING
  }



},{
  sequelize,
  tableName:'tb_hotbook',
})
module.exports={HotBook}