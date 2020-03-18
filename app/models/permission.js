const { sequelize } = require('../../core/db');
const { Sequelize, Model } = require('sequelize');
const { NotFound, AuthFaild } = require('../../core/http-exception');
class Permission extends Model {}
Permission.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    resource: {
      type: Sequelize.STRING,
      allowNull: false
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false
    },
    handle:{
        type: Sequelize.STRING,
        allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'tb_permission'
  }
);
module.exports = { Permission };
