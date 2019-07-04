const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')
const { snowflake } = require('../../core/util')


class FileManage extends Model {
  static async uploadFile(fileInfo, uid) {
    const { size, path, name, type,oss_url,oss_name } = fileInfo
    console.log(path)
    console.log(fileInfo)
    const nameSplit = path.split('/')
    const save_name = nameSplit[nameSplit.length - 1]
    let insertRes=null
    insertRes = await FileManage.create({
      path,
      file_size: size,
      file_type: type,
      file_name: name,
      save_name,
      user: uid,
      oss_url,
      oss_name,
      key: snowflake()
    })
    return insertRes
    
  }
}
FileManage.init({
  key: {
    type: Sequelize.STRING,
    allowNull: false,
    column: '用于提取文件的key'
  },
  path: {
    type: Sequelize.STRING,
    allowNull: false,
    column: '文件保存路径'
  },
  oss_url:{
    type:Sequelize.STRING,
    column:'阿里云Url'
  },
  oss_name:{
    type:Sequelize.STRING,
    column:'阿里云存储位置'
  },
  file_name: {
    type: Sequelize.STRING,
    allowNull: false,
    column: '文件原始文件名'
  },
  file_type: {
    type: Sequelize.STRING,
    allowNull: true,
    column: '文件类型，一般为后缀名'
  },
  file_size: {
    type: Sequelize.INTEGER,
    allowNull: true,
    column: '文件大小'
  },
  save_name: {
    type: Sequelize.STRING,
    allowNull: false,
    column: '当前存储文件名'
  },
  user: {
    type: Sequelize.STRING,
    allowNull: false,
    column: '存储该文件的用户ID'
  },
  storage_time: {
    type: Sequelize.INTEGER,
    allowNull: true,
    column: '文件存放时长，不填则为永久'
  }
}, {
    sequelize,
    tableName: 'file_manage',
  }
)
module.exports = { FileManage }