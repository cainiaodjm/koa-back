const {sequelize}=require('../../../core/db')
const {Sequelize,Model}=require('sequelize')
const  {B}=require('./b')
const  {C}=require('./c')

class A extends Model {}
A.init({}, { sequelize, modelName: 'a',tableName:"tb_a"  })

// A.belongsToMany(B,{
//     through:C
// })
module.exports={
    A
}
