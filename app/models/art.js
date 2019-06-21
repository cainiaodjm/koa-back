const {Movie,Sentence,Music}=require('./classic')
class Art {
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