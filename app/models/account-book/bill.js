const { sequelize } = require('../../../core/db')
const { Sequelize, Model } = require('sequelize')
const moment = require('moment')
class Bill extends Model {}
Bill.init({
    //主键id
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    //账单所属用户
    uid: {
        type: Sequelize.INTEGER
    },
    //账单类型 支出 1 收入 0
    type: {
        type: Sequelize.INTEGER
    },
    //账单的数量
    amount: {
        type: Sequelize.DOUBLE,
    },
    //账单描述
    description: {
        type: Sequelize.STRING,
    },
    //账单分类名称 
    category_name: {
        type: Sequelize.STRING,
    },
    bill_name: {
        type: Sequelize.STRING,
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
}, {
    sequelize,
    tableName: 'tb_bill',
})

module.exports = {
    Bill
}