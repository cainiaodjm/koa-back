const {sequelize}=require('../../../core/db')
const {Sequelize,Model}=require('sequelize')


class C extends Model {}
C.init({}, { sequelize, modelName: 'c',tableName:"tb_c"})

module.exports={
    C
}
