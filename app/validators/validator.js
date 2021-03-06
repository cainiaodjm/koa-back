const {LinValidator,Rule} =require('../../core/lin-validator')
const {User}=require('../models/user')
const {LoginType,ArtType}=require('../lib/enum')
class PositiveIntegerValidator extends LinValidator{
  constructor(){
    super()
    this.id=[
      new Rule('isInt','需要的是正整数',{min:1}),
     
    ]
  }
}
class UserValidator extends LinValidator{
  constructor(){
    super()
    this.email=[
      new Rule('isEmail','不符合email规范')
    ]
    this.nickname=[
      new Rule('optional'),
      new Rule('isLength','昵称不符合长度规范',{min:6,max:32})
    ]
  }
}
class RegisterValidator extends LinValidator{
  constructor(){
    super()
    this.email=[
      new Rule('isEmail','不符合email规范')
    ]
    this.password=[
      new Rule('isLength','密码至少6个字符,最多32个字符',{min:6,max:32}),
      new Rule('matches','密码不符合','^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.passwordConfirm=this.password
    this.nickname=[
      new Rule('isLength','昵称不符合长度规范',{min:6,max:32}),
    ]
  }
  validatePassword(vals){
    
    const password=vals.body.password
    const passwordConfirm=vals.body.passwordConfirm
    if(password!==passwordConfirm){
      throw new Error('密码与确认密码必须相同')
    }
  }
  async validateEmail(vals){
    const email=vals.body.email
    const user=await User.findOne({
      where:{
        email:email
      }
    })
    if(user){
      throw new Error('email已经存在')
    }

  }
}
class TokenValidator extends LinValidator{
  constructor(){
    super()
    this.account=[
      new Rule('isLength','不符合账号规则',{min:4,max:32})
    ]
    this.secret=[
      /**
       * 用户登录多种情况
       * 1.可以为空 可以不传
       */
      new Rule('optional'),//如果传了则 验证规则 
      new Rule('isLength','至少6个字符',{min:6,max:128})
    ]
    //type 枚举
   

  }
  validateLoginType(vals){
    if(!vals.body.type){
      throw new Error('缺少type字段')
    }
    // if(!'^-?\\d+$'.exec(vals.body.type)){
    //   throw new Error('type参数不合法')
    // }
    if(!LoginType.isThisType(vals.body.type)){
      throw new Error('type参数不合法')
    }
    
  }
}
class NotEmptyValidator extends LinValidator{
  constructor(){
    super()
    this.token=[
      new Rule('isLength','不允许为空',{min:1})
    ]
  }
}
class BookValidator extends LinValidator{
  constructor(){
    super()
    this.title=[
      new Rule('isLength','不允许为空',{min:1})
    ]
    this.content=[
      new Rule('isLength','不允许为空',{min:1})
    ]
    this.author=[
      new Rule('isLength','不允许为空',{min:1})
    ]
    this.nationality=[
      new Rule('isInt','需要的是正整数',{min:1})
    ],
    this.press_name=[
      new Rule('isLength','不允许为空',{min:1})
    ]
    this.press_date=[
      new Rule('isLength','不允许为空',{min:1})
    ],
    this.page_count=[
      new Rule('isInt','需要的是正整数',{min:1})
    ],
    this.price=[
      new Rule('matches','价格参数不符合','^(\\-|\\+)?\\d+(\\.\\d+)?$')
    ]
    this.paperback=[
      new Rule('isInt','需要的是正整数',{min:1})
    ]

  }
}
class CommentValidator extends LinValidator{
  constructor(){
    super()
    this.content=[
      new Rule('isLength','短评字数不符合规范',{min:1,max:24})
    ]
    this.book_id=[
      new Rule('isInt','book_id参数不合法',{min:1})
    ]
  }
}
class GetFileValidator extends LinValidator{
  constructor(){
    super()
    this.key=[
      new Rule('isLength','key为必填字段',{min:1})
    ]
    this.type=[
      new Rule('isLength','type为必填字段',{min:1})
    ]
    this.source=[
      new Rule('optional','','local'),
    ]
  }
  validateType(vals){
    let type=vals.body.type || vals.path.type || vals.query.type
    let source=vals.body.source || vals.path.source || vals.query.source
    let typeOptions=[
      "download",
      "text"
    ]
    let sourceOptions=[
      "local",
      "oss"
    ]
    let sorceFlag=sourceOptions.findIndex((item)=>{
      return item === source
    })
    
    if(!type){
      throw new Error('缺少type字段')
    }
    if(typeOptions.findIndex((item)=>{
      return item === type
    })=== -1){
      throw new Error('type参数不合法')
    }
    if(sorceFlag === -1){
      throw new Error('source参数不合法')
    }

  }
}
class FileListValidator extends LinValidator{
  constructor(){
    super()
    this.start=[
      new Rule('isInt','start不符合规范',{min:0, max:60000}),
      new Rule('optional','',0),
    ]
    this.count=[
      new Rule('isInt','count不符合规范',{min:1,max:20}),
      new Rule('optional','',20),
    ]
  }
}
class FlowValidator extends LinValidator{
  constructor(){
    super()
    this.title=[
      new Rule('isLength','标题不能为空',{min:1})
    ]
    this.content=[
      new Rule('isLength','内容不能为空',{min:6})
    ]
    this.type=[
      new Rule('isInt','需要的是正整数',{min:1})
    ]
    this.image=[
      new Rule('isLength','图片地址不能为空',{min:6})
    ]
    this.musicUrl=[
      new Rule('isLength','音乐路径不能为空',{min:1}),
      new Rule('optional','',0),
    ]
    this.pubdate=[
      new Rule('isLength','发布日期不能为空',{min:1}),
    ]
  }
  validateArtType(vals){
    let type=vals.body.type || vals.path.type
    if(!type){
      throw new Error('缺少type字段')
    }
    if(!ArtType.isThisType(type)){
      throw new Error('type参数不合法')
    }

  }

}
class PageValidator extends LinValidator{
  constructor(){
    super()
    this.start=[
      new Rule('isInt','start不符合规范',{min:0, max:60000}),
      new Rule('optional','',0),
    ]
    this.count=[
      new Rule('isInt','count不符合规范',{min:1,max:60000}),
      new Rule('optional','',20),
    ]
  }
}
class SearchValidator extends LinValidator{
  constructor(){
    super()
    this.q=[new Rule('isLength','查询条件不能为空',{min:1})]
    this.start=[
      new Rule('isInt','start不符合规范',{min:0, max:60000}),
      new Rule('optional','',0),
    ]
    this.count=[
      new Rule('isInt','count不符合规范',{min:1,max:20}),
      new Rule('optional','',20),
    ]
  }
}
class LikeValidator extends LinValidator{
  constructor(){
    super()
    this.art_id=[
      new Rule('isInt','需要的是正整数',{min:1})
    ]
    this.type=[
      new Rule('isInt','需要的是正整数',{min:1})
    ]
  }
  validateArtType(vals){
    let type=vals.body.type || vals.path.type
    if(!type){
      throw new Error('缺少type字段')
    }
    if(!ArtType.isThisType(type)){
      throw new Error('type参数不合法')
    }
  }

}
class PostIdValdiator extends LinValidator{
  constructor(){
    super()
    this.id=[
      new Rule('isLength','文章Id不能为空',{min:1,max:128}) 
    ]
  }
}
class PostValidator extends LinValidator{
  constructor(){
    super()
    this.title=[
      new Rule('isLength','文章标题不能为空',{min:1,max:128})
    ]
    this.content=[
      new Rule('isLength','文章标题不能为空',{min:1,max:102400})
    ]
    this.category_id=[
      new Rule('isInt','需要的是正整数',{min:1})
    ]
    this.tags=[
      new Rule('isLength','标签不能空',{min:1,max:1024})
    ]
  }
}
module.exports={
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  UserValidator,
  NotEmptyValidator,
  BookValidator,
  LikeValidator,
  SearchValidator,
  CommentValidator,
  FileListValidator,
  GetFileValidator,
  FlowValidator,
  PageValidator,
  PostValidator,
  PostIdValdiator
}