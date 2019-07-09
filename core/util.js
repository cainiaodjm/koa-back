const jwt = require('jsonwebtoken')
const moment=require('moment')
const { Snowflake } = require('node-snowflake')
const config=require('../config/config')
/***
 * 
 */

const getNewToken=function(token){
    const expiresIn=config.security.expiresIn
    const secretKey=config.security.secretKey
    let newToken=""
    try {
        let decode=jwt.verify(token,secretKey)
        newToken= jwt.sign({
            uid:decode.uid,
            scope:decode.scope
        },secretKey,{
            expiresIn
        })
        return newToken
    } catch (error) {
       return false
    }
    
    
} 
 /**
  * 
  * @param {*} uid   用户id
  * @param {*} scope 用户权限
  */
const generateToken=function(uid,scope){
    const secretKey=config.security.secretKey
    const expiresIn=config.security.expiresIn
    //放入载荷,钥匙
    const token= jwt.sign({
        uid,
        scope
    },secretKey,{
        expiresIn
    })
    return token
}
const getRandomString=function(length){
    let result=''
    const chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let  i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
const getFilePathByTime=function(fileName,root='file_manage',){
    const year=moment().year()
    const month=moment().month()+1
    const day=moment().date()
    const randomString=getRandomString(32)
    let filePath=`${root}/${year}/${month}/${day}/${fileName}-${randomString}`
    return filePath
}



const snowflake=function(num=0){
    return Snowflake.nextId(1, 1, Math.floor((1000 + num) * Math.random()))
}







const findMembers = function (instance, {
    prefix,
    specifiedType,
    filter
}) {
    // 递归函数
    function _find(instance) {
        //基线条件（跳出递归）
        if (instance.__proto__ === null)
            return []

        let names = Reflect.ownKeys(instance)
        names = names.filter((name) => {
            // 过滤掉不满足条件的属性或方法名
            return _shouldKeep(name)
        })

        return [...names, ..._find(instance.__proto__)]
    }

    function _shouldKeep(value) {
        if (filter) {
            if (filter(value)) {
                return true
            }
        }
        if (prefix)
            if (value.startsWith(prefix))
                return true
        if (specifiedType)
            if (instance[value] instanceof specifiedType)
                return true
    }

    return _find(instance)
}

module.exports = {
    findMembers,
    generateToken,
    getRandomString,
    getFilePathByTime,
    snowflake,
    getNewToken
}