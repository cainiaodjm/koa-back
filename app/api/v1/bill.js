const Router = require('koa-router')
const {
    UserValidator,
    PositiveIntegerValidator
} = require('../../validators/validator')
const { Bill } = require('../../models/account-book/bill')
const { BillCategory } = require('../../models/account-book/bill_category')
const { Success, NotFound } = require('../../../core/http-exception')
const { Auth } = require('../../../middlewares/auth')
const router = new Router({
    prefix: '/v1/account-book'
})
router.get('/:id/bill-list', async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx)
    let id = v.get('path.id')
    throw new Success("查询成功", 0, {
        data: id
    })
})
module.exports = router