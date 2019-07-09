const {Movie,Sentence,Music}=require('./classic')
const {Sequelize,Model,Op}=require('sequelize')

class Art {

  /**
   * 
   * @param {*} artInfoList 
   * 
   * 获取某个用户的喜欢的类型  对类型进行分类 
   * 分类后对每个分类的表进行In查询
   */
  static async getList(artInfoList){
    let queryObj={
      movie:[],
      music:[],
      sentence:[]
    }
    let list=[]
    
    for(let i=0;i<artInfoList.length;i++){
     
      switch (artInfoList[i].type) {
        case 100:
            queryObj.movie.push(artInfoList[i])
          break;
        case 200:
          queryObj.music.push(artInfoList[i])
          break;
        case 300:
          queryObj.sentence.push(artInfoList[i])
          break;
        default:
          break;
      }
    }
    for(let i=0;i<Object.keys(queryObj).length;i++){
      let key=Object.keys(queryObj)[i]
      let ids=[]
      
      switch (key) {
        case "movie":
          for(let j=0;j<queryObj[key].length;j++){
            ids.push(queryObj[key][j].art_id)
          }
          if(ids.length===0)break
          let movies= await Movie.scope('bh').findAll({
            where:{
              id:{
                [Op.in]:ids
              }
            }
          })
         
          movies.forEach((item)=>{
            list.push(item)
          })
          
          break;
        case "music":
            for(let j=0;j<queryObj[key].length;j++){
              ids.push(queryObj[key][j].art_id)
            }
            if(ids.length===0)break
            let musices= await Music.scope('bh').findAll({
              where:{
                id:{
                  [Op.in]:ids
                }
              }
            })
        
            musices.forEach((item)=>{
              list.push(item)
            })
          break;
          case "sentence":
              for(let j=0;j<queryObj[key].length;j++){
                ids.push(queryObj[key][j].art_id)
              }
              if(ids.length===0)break
              let sentences= await Sentence.scope('bh').findAll({
                where:{
                  id:{
                    [Op.in]:ids
                  }
                }
              })
              sentences.forEach((item)=>{
                list.push(item)
              })
            break;
          

        default:
          break;
      }
     
    }
    return list
   

  }

  /**这里加了一个scope参数 是为了应对sequelize的bug 这个bug是在开启事务操作时，
   * 事务里面CRUD都会把scope当做查询条件 加入到sql语句中,所以在事务操作的时候
   * getData需要设置为false
   * 
   * @param {} art_id 
   * @param {*} type 
   * @param {*} useScope 
   */
  static async getData(art_id, type,useScope=true) {
    let art=null
    const finder={
      where:{
        id:art_id,
      }
    }
    const scope=useScope ? 'bh' :null
    switch (type) {
      case 100:
        art= await Movie.scope(scope).findOne(finder)
        break;
      case 200:
          art= await Music.scope(scope).findOne(finder)
        break;
      case 300:
          art= await Sentence.scope(scope).findOne(finder)
        break;
      case 400:
          const {
            Book
        } = require('./book')
        art = await Book.scope(scope).findOne(finder)
        if(!art){
          art = await Book.create({
            id:art_id
          })
        }
        break;
      default:
        break;
    }
    return art
  }
}
module.exports={
  Art
}