const {sequelize}=require('../../../core/db')
const {Sequelize,Model}=require('sequelize')
const {A} =require('./a')
const {C}=require('./c')

class B extends Model {}
B.init({}, { sequelize, modelName: 'b',tableName:"tb_b" })
module.exports={
    B
}

