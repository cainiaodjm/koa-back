const Router = require('koa-router');
const { Success, NotFound } = require('../../../core/http-exception');
const { Auth } = require('../../../middlewares/auth');
// const {A}= require('../../models/test/a')
const router = new Router({
  prefix: '/v1/test'
});

router.get('/a', async (ctx, next) => {
  // ctx.body=global
  const posts = await global.db.Post.findAll({
    include: [
      {
        model: global.db.Tag,
        as: 'tag'
      },
      {
        model: global.db.Category,
        as: 'category'
      }
    ],
    limit: 5,
    offset: 0
  });
  ctx.body = posts;
});
router.post('/auth/login', async (ctx, next) => {
  ctx.body = {
    code:200,
    user: {
      id: 1,
      username: 'admin',
      nickName: '管理员',
      sex: '男',
      avatar: '人像-20200315034122810.jpg',
      email: 'zhengjie@tom.com',
      phone: '18888888888',
      dept: '研发部',
      job: '全栈开发',
      enabled: true,
      createTime: 1534986716000,
      roles: [
        'dept:edit',
        'user:list',
        'storage:add',
        'dept:add',
        'storage:edit',
        'menu:del',
        'roles:del',
        'admin',
        'storage:list',
        'job:edit',
        'deployHistory:list',
        'user:del',
        'server:list',
        'dict:add',
        'dept:list',
        'timing:add',
        'job:list',
        'dict:del',
        'dict:list',
        'app:list',
        'job:add',
        'database:list',
        'timing:list',
        'deploy:list',
        'roles:add',
        'user:add',
        'pictures:list',
        'menu:edit',
        'timing:edit',
        'menu:list',
        'storage:del',
        'roles:list',
        'menu:add',
        'job:del',
        'user:edit',
        'roles:edit',
        'timing:del',
        'dict:edit',
        'serverDeploy:list',
        'dept:del'
      ]
    },

    token:
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJkZXB0OmVkaXQsdXNlcjpsaXN0LHN0b3JhZ2U6YWRkLGRlcHQ6YWRkLHN0b3JhZ2U6ZWRpdCxtZW51OmRlbCxyb2xlczpkZWwsYWRtaW4sc3RvcmFnZTpsaXN0LGpvYjplZGl0LGRlcGxveUhpc3Rvcnk6bGlzdCx1c2VyOmRlbCxzZXJ2ZXI6bGlzdCxkaWN0OmFkZCxkZXB0Omxpc3QsdGltaW5nOmFkZCxqb2I6bGlzdCxkaWN0OmRlbCxkaWN0Omxpc3QsYXBwOmxpc3Qsam9iOmFkZCxkYXRhYmFzZTpsaXN0LHRpbWluZzpsaXN0LGRlcGxveTpsaXN0LHJvbGVzOmFkZCx1c2VyOmFkZCxwaWN0dXJlczpsaXN0LG1lbnU6ZWRpdCx0aW1pbmc6ZWRpdCxtZW51Omxpc3Qsc3RvcmFnZTpkZWwscm9sZXM6bGlzdCxtZW51OmFkZCxqb2I6ZGVsLHVzZXI6ZWRpdCxyb2xlczplZGl0LHRpbWluZzpkZWwsZGljdDplZGl0LHNlcnZlckRlcGxveTpsaXN0LGRlcHQ6ZGVsIiwiZXhwIjoxNTg0MjcxMzk3fQ.a2FRA_xgCOFLlni-WRto1p3PTSRqOaxvF5VLATsdbe5yhYsxuFO7b0f0HOs1NbOrj3abZkWQFa_OO_XyzhFEdw'
  };
});
router.get('/auth/info', async (ctx, next) => {
    ctx.body = {

        id: 1,
        username: 'admin',
        nickName: '管理员',
        sex: '男',
        avatar: '人像-20200315034122810.jpg',
        email: 'zhengjie@tom.com',
        phone: '18888888888',
        dept: '研发部',
        job: '全栈开发',
        enabled: true,
        createTime: 1534986716000,
        roles: [
          'dept:edit',
          'user:list',
          'storage:add',
          'dept:add',
          'storage:edit',
          'menu:del',
          'roles:del',
          'admin',
          'storage:list',
          'job:edit',
          'deployHistory:list',
          'user:del',
          'server:list',
          'dict:add',
          'dept:list',
          'timing:add',
          'job:list',
          'dict:del',
          'dict:list',
          'app:list',
          'job:add',
          'database:list',
          'timing:list',
          'deploy:list',
          'roles:add',
          'user:add',
          'pictures:list',
          'menu:edit',
          'timing:edit',
          'menu:list',
          'storage:del',
          'roles:list',
          'menu:add',
          'job:del',
          'user:edit',
          'roles:edit',
          'timing:del',
          'dict:edit',
          'serverDeploy:list',
          'dept:del'
        ]
      }
    ;
  });
router.get('/api/menus/build', async (ctx, next) => {
    ctx.body = 
        [{
            "name": "系统管理",
            "path": "/system",
            "hidden": false,
            "redirect": "noredirect",
            "component": "Layout",
            "alwaysShow": true,
            "meta": {
                "title": "系统管理",
                "icon": "system",
                "noCache": true
            },
            "children": [{
                "name": "User",
                "path": "user",
                "hidden": false,
                "component": "system/user/index",
                "meta": {
                    "title": "用户管理",
                    "icon": "peoples",
                    "noCache": true
                }
            }, {
                "name": "Role",
                "path": "role",
                "hidden": false,
                "component": "system/role/index",
                "meta": {
                    "title": "角色管理",
                    "icon": "role",
                    "noCache": true
                }
            }, {
                "name": "Menu",
                "path": "menu",
                "hidden": false,
                "component": "system/menu/index",
                "meta": {
                    "title": "菜单管理",
                    "icon": "menu",
                    "noCache": true
                }
            }, {
                "name": "Dept",
                "path": "dept",
                "hidden": false,
                "component": "system/dept/index",
                "meta": {
                    "title": "部门管理",
                    "icon": "dept",
                    "noCache": true
                }
            }, {
                "name": "Job",
                "path": "job",
                "hidden": false,
                "component": "system/job/index",
                "meta": {
                    "title": "岗位管理",
                    "icon": "Steve-Jobs",
                    "noCache": true
                }
            }, {
                "name": "Dict",
                "path": "dict",
                "hidden": false,
                "component": "system/dict/index",
                "meta": {
                    "title": "字典管理",
                    "icon": "dictionary",
                    "noCache": true
                }
            }]
        }, {
            "name": "系统监控",
            "path": "/monitor",
            "hidden": false,
            "redirect": "noredirect",
            "component": "Layout",
            "alwaysShow": true,
            "meta": {
                "title": "系统监控",
                "icon": "monitor",
                "noCache": true
            },
            "children": [{
                "name": "OnlineUser",
                "path": "online",
                "hidden": false,
                "component": "monitor/online/index",
                "meta": {
                    "title": "在线用户",
                    "icon": "Steve-Jobs",
                    "noCache": true
                }
            }, {
                "name": "Log",
                "path": "logs",
                "hidden": false,
                "component": "monitor/log/index",
                "meta": {
                    "title": "操作日志",
                    "icon": "log",
                    "noCache": true
                }
            }, {
                "name": "ErrorLog",
                "path": "errorLog",
                "hidden": false,
                "component": "monitor/log/errorLog",
                "meta": {
                    "title": "异常日志",
                    "icon": "error",
                    "noCache": true
                }
            }, {
                "name": "ServerMonitor",
                "path": "server",
                "hidden": false,
                "component": "monitor/server/index",
                "meta": {
                    "title": "服务监控",
                    "icon": "codeConsole",
                    "noCache": true
                }
            }, {
                "name": "Sql",
                "path": "druid",
                "hidden": false,
                "component": "monitor/sql/index",
                "meta": {
                    "title": "SQL监控",
                    "icon": "sqlMonitor",
                    "noCache": true
                }
            }]
        }, {
            "name": "Mnt",
            "path": "/mnt",
            "hidden": false,
            "redirect": "noredirect",
            "component": "Layout",
            "alwaysShow": true,
            "meta": {
                "title": "运维管理",
                "icon": "mnt",
                "noCache": true
            },
            "children": [{
                "name": "ServerDeploy",
                "path": "mnt/serverDeploy",
                "hidden": false,
                "component": "mnt/server/index",
                "meta": {
                    "title": "服务器",
                    "icon": "server",
                    "noCache": true
                }
            }, {
                "name": "App",
                "path": "mnt/app",
                "hidden": false,
                "component": "mnt/app/index",
                "meta": {
                    "title": "应用管理",
                    "icon": "app",
                    "noCache": true
                }
            }, {
                "name": "Deploy",
                "path": "mnt/deploy",
                "hidden": false,
                "component": "mnt/deploy/index",
                "meta": {
                    "title": "部署管理",
                    "icon": "deploy",
                    "noCache": true
                }
            }, {
                "name": "DeployHistory",
                "path": "mnt/deployHistory",
                "hidden": false,
                "component": "mnt/deployHistory/index",
                "meta": {
                    "title": "部署备份",
                    "icon": "backup",
                    "noCache": true
                }
            }, {
                "name": "Database",
                "path": "mnt/database",
                "hidden": false,
                "component": "mnt/database/index",
                "meta": {
                    "title": "数据库管理",
                    "icon": "database",
                    "noCache": true
                }
            }]
        }, {
            "name": "系统工具",
            "path": "/sys-tools",
            "hidden": false,
            "redirect": "noredirect",
            "component": "Layout",
            "alwaysShow": true,
            "meta": {
                "title": "系统工具",
                "icon": "sys-tools",
                "noCache": true
            },
            "children": [{
                "name": "Timing",
                "path": "timing",
                "hidden": false,
                "component": "system/timing/index",
                "meta": {
                    "title": "定时任务",
                    "icon": "timing",
                    "noCache": true
                }
            }, {
                "name": "GeneratorIndex",
                "path": "generator",
                "hidden": false,
                "component": "generator/index",
                "meta": {
                    "title": "代码生成",
                    "icon": "dev",
                    "noCache": false
                }
            }, {
                "name": "GeneratorConfig",
                "path": "generator/config/:tableName",
                "hidden": true,
                "component": "generator/config",
                "meta": {
                    "title": "生成配置",
                    "icon": "dev",
                    "noCache": false
                }
            }, {
                "name": "Pictures",
                "path": "pictures",
                "hidden": false,
                "component": "tools/picture/index",
                "meta": {
                    "title": "图床管理",
                    "icon": "image",
                    "noCache": true
                }
            }, {
                "name": "Storage",
                "path": "storage",
                "hidden": false,
                "component": "tools/storage/index",
                "meta": {
                    "title": "存储管理",
                    "icon": "qiniu",
                    "noCache": true
                }
            }, {
                "name": "Email",
                "path": "email",
                "hidden": false,
                "component": "tools/email/index",
                "meta": {
                    "title": "邮件工具",
                    "icon": "email",
                    "noCache": true
                }
            }, {
                "name": "Swagger",
                "path": "swagger2",
                "hidden": false,
                "component": "tools/swagger/index",
                "meta": {
                    "title": "接口文档",
                    "icon": "swagger",
                    "noCache": true
                }
            }, {
                "name": "AliPay",
                "path": "aliPay",
                "hidden": false,
                "component": "tools/aliPay/index",
                "meta": {
                    "title": "支付宝工具",
                    "icon": "alipay",
                    "noCache": true
                }
            }, {
                "name": "Preview",
                "path": "generator/preview/:tableName",
                "hidden": true,
                "component": "generator/preview",
                "meta": {
                    "title": "生成预览",
                    "icon": "java",
                    "noCache": false
                }
            }]
        }, {
            "name": "组件管理",
            "path": "/components",
            "hidden": false,
            "redirect": "noredirect",
            "component": "Layout",
            "alwaysShow": true,
            "meta": {
                "title": "组件管理",
                "icon": "zujian",
                "noCache": true
            },
            "children": [{
                "name": "Echarts",
                "path": "echarts",
                "hidden": false,
                "component": "components/Echarts",
                "meta": {
                    "title": "图表库",
                    "icon": "chart",
                    "noCache": false
                }
            }, {
                "name": "Icons",
                "path": "icon",
                "hidden": false,
                "component": "components/icons/index",
                "meta": {
                    "title": "图标库",
                    "icon": "icon",
                    "noCache": true
                }
            }, {
                "name": "Editor",
                "path": "tinymce",
                "hidden": false,
                "component": "components/Editor",
                "meta": {
                    "title": "富文本",
                    "icon": "fwb",
                    "noCache": true
                }
            }, {
                "name": "Markdown",
                "path": "markdown",
                "hidden": false,
                "component": "components/MarkDown",
                "meta": {
                    "title": "Markdown",
                    "icon": "markdown",
                    "noCache": true
                }
            }, {
                "name": "YamlEdit",
                "path": "yaml",
                "hidden": false,
                "component": "components/YamlEdit",
                "meta": {
                    "title": "Yaml编辑器",
                    "icon": "dev",
                    "noCache": true
                }
            }]
        }, {
            "name": "多级菜单",
            "path": "/nested",
            "hidden": false,
            "redirect": "noredirect",
            "component": "Layout",
            "alwaysShow": true,
            "meta": {
                "title": "多级菜单",
                "icon": "menu",
                "noCache": true
            },
            "children": [{
                "name": "二级菜单1",
                "path": "menu1",
                "hidden": false,
                "redirect": "noredirect",
                "component": "nested/menu1/index",
                "alwaysShow": true,
                "meta": {
                    "title": "二级菜单1",
                    "icon": "menu",
                    "noCache": true
                },
                "children": [{
                    "name": "三级菜单2",
                    "path": "menu1-2",
                    "hidden": false,
                    "component": "nested/menu1/menu1-2",
                    "meta": {
                        "title": "三级菜单2",
                        "icon": "menu",
                        "noCache": true
                    }
                }, {
                    "name": "三级菜单1",
                    "path": "menu1-1",
                    "hidden": false,
                    "component": "nested/menu1/menu1-1",
                    "meta": {
                        "title": "三级菜单1",
                        "icon": "menu",
                        "noCache": true
                    }
                }]
            }, {
                "name": "二级菜单2",
                "path": "menu2",
                "hidden": false,
                "component": "nested/menu2/index",
                "meta": {
                    "title": "二级菜单2",
                    "icon": "menu",
                    "noCache": true
                }
            }]
        }]
    
  });
module.exports = router;
