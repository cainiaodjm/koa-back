const {
    sequelize
} = require('../../core/db')
const {
    Sequelize,
    Model
} = require('sequelize')
const bcrypt = require('bcryptjs')
class Menu extends Model {}
Menu.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "父Id",
        field: "p_id"
    },
    type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: "菜单类型: 1. 管理平台菜单 2. BBS菜单 3. 移动端菜单"
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "菜单编码"
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "菜单名称"
    },
    component: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "对应组件: -1. 根节点 1. 页面组件 2.默认布局 3456...扩展布局"
    },
    icon: {
        type: Sequelize.STRING,
        allowNull:true,
        comment:"菜单图标"
    },
    alias: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "别名"
    },
    redirect:{

    },
    createUser: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        field: "create_user"
    },
    updateUser: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        field: "update_user"
    },
    deleteUser: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        field: "delete_user"
    },
    flag: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1,
        allowNull: false,
        comment: "状态: 0：删除，1：可用(默认为1)"
    }

}, {
    sequelize,
    tableName: 'bbs_role',
})

module.exports = {
    Role
}