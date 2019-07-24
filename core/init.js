const requireDirectory=require('require-directory')
const Router=require('koa-router')
class InitManager{
  static initCore(app){
    InitManager.app=app
    //入口方法
    InitManager.initLoadRouters()
    InitManager.loadConfig()
    InitManager.initDbModels()
  }
  static loadConfig(path=''){
      const configPath=path|| process.cwd()+'/config/config.js'
      const config=require(configPath)
      global.config=config
  }
  static initLoadRouters(){
    const apiDirectory=`${process.cwd()}/app/api`
    requireDirectory(module,apiDirectory ,{
      visit:whenLoadModule
    })

    function whenLoadModule(obj){
      if(obj instanceof Router){
        InitManager.app.use(obj.routes())
      }
    }
  }
  static initDbModels(){
    /**
     初始化所有模型的关联关系
     */
    let db={}

    const {Post}=require('../app/models/blog_post')
    const {Tag}=require('../app/models/blog_tag')
    const {PostTag}=require('../app/models/blog_post_tag')
    const {Category}=require('../app/models/blog_category')
    const {Comment}=require('../app/models/blog/comment')
    Post.belongsToMany(Tag,{
      as:"tag",
      through:{
        model:PostTag
      },
      constraints:false,
      foreignKey:'post_id'
    })
    Post.hasMany(Comment,{
      foreignKey:"post_id",
      as:"comment",
      constraints:false
    })
    Post.belongsTo(Category,{
      foreignKey:"category_id",
      as:'category'
    })
    Tag.belongsToMany(Post,{
      as:'post',
      through:{
        model:PostTag
      },
      constraints:false,
      foreignKey:'tag_id'
    })
    db.Post=Post
    db.Tag=Tag
    db.PostTag=PostTag
    db.Category=Category
    db.Comment=Comment
    global.db=db
  }
}
module.exports=InitManager
