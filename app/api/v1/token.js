const bcrypt = require('bcryptjs')
const Router = require('koa-router')
const {
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator
} = require('../../validators/validator')
const {
  LoginType
} = require('../../lib/enum')
const {
  User
} = require('../../models/user')
const {
  generateToken,
  getNewToken
} = require('../../../core/util')
const {
  Success
} = require('../../../core/http-exception')
const {
  Auth
} = require('../../../middlewares/auth')
const {
  WXManager
} = require('../../services/ws')
const router = new Router({})

router.post('/v1/token/verify', async (ctx, next) => {
  const v = await new NotEmptyValidator().validate(ctx)
  const result = Auth.verifyToken(v.get('body.token'))
  throw new Success('验证成功', 0, {
    is_verify: result
  })
})
router.post('/v1/authorization', async (ctx, next) => {
  const v = await new NotEmptyValidator().validate(ctx)
  const token = getNewToken(v.get('body.token'))
  if (!token) {
    throw new Success("token已失效", 10007, false)
  }
  ctx.body = {
    "flag": true,
    "err_code": 0,
    "err_msg": "验证成功",
    "at_time": "2018-10-20 19:09:51",
    "result": {
      "id": "1006",
      "account": "tony@qq.com",
      "nickname": "tony@qq.com",
      "email": "tony@qq.com",
      "token": token,
      "page_list": {
        "home": true,
        "account-book": true,
        "bill": true,
        "_home": true,
        "components": true,
        "split": true,
        "input": true,
        "edit-table": true,
        "oldland": true,
        "flow_page": true,
        "file_page": true,
        "add_post": true,
        "post_list": true,
        "vuejs": true,
        "demo1": true,
        "demo2-cart": true,
        "demo2": true,
        "demo3": true,
        "demo4": true,

      },
      "component_list": []
    }
  }
})
router.post('/v1/token', async (ctx, next) => {
  let v = await new TokenValidator().validate(ctx)

  let token
  switch (v.get("body.type")) {
    case LoginType.USER_EMAIL:
      token = await emialLogin(v.get("body.account"), v.get("body.secret"))
      break;
    case LoginType.USER_MINI_PROGRAM:
      token = await WXManager.codeToToken(v.get('body.account'))
      break;
    default:
      break;
  }
  throw new Success("success", 0, {
    token
  })
})
async function emialLogin(account, secret) {
  //调用模型类
  const user = await User.verifyEmailPassword(account, secret)
  return generateToken(user.id, Auth.USER)

}

module.exports = router