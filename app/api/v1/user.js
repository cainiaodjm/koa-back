const bcrypt = require('bcryptjs');
const Router = require('koa-router');
const moment = require('moment');
const { Auth } = require('../../../middlewares/auth');
const {
  RegisterValidator,
  UserValidator
} = require('../../validators/validator');
const { User } = require('../../models/user');
const { Success, NotFound } = require('../../../core/http-exception');
const router = new Router({
  // prefix:'v1/user'
});
router.post('/v1/user/login', async (ctx, next) => {
  throw new Success('登录成功', 0, {
      username:"admin",
    uid:23,
    uuid:"ed1d858c-af98-4b35-a99f-e9936103a4e1",
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjMsInNjb3BlIjo4LCJpYXQiOjE1NjExMDEzMjYsImV4cCI6MTU2MTEwNDkyNn0.oVGcXolQcnQ1Adg-ZffzJuVQhTcyDqaocDrSM_IBbNU'
  });
});
router.get('/v1/user/info', async (ctx, next) => {
  let data = {
    userName: 'MenuManager',
    userRoles: ['R_MENUADMIN'],
    userPermissions: ['p_menu_view', 'p_menu_edit', 'p_menu_menu'],
    accessMenus: [
      {
        title: '系统',
        path: '/system',
        icon: 'cogs',
        children: [
          {
            title: '系统设置',
            icon: 'cogs',
            children: [
              {
                title: '菜单管理',
                path: '/system/menu',
                icon: 'th-list'
              }
            ]
          },
          {
            title: '组织架构',
            icon: 'pie-chart',
            children: [
              {
                title: '部门管理',
                icon: 'html5'
              },
              {
                title: '职位管理',
                icon: 'opencart'
              }
            ]
          }
        ]
      }
    ],
    accessRoutes: [
      {
        name: 'System',
        path: '/system',
        component: 'layoutHeaderAside',
        componentPath: 'layout/header-aside/layout',
        meta: {
          title: '系统设置',
          cache: true
        },
        children: [
          {
            name: 'MenuPage',
            path: '/system/menu',
            component: 'menu',
            componentPath: 'pages/sys/menu/index',
            meta: {
              title: '菜单管理',
              cache: true
            }
          },
          {
            name: 'RoutePage',
            path: '/system/route',
            component: 'route',
            componentPath: 'pages/sys/route/index',
            meta: {
              title: '路由管理',
              cache: true
            }
          },
          {
            name: 'RolePage',
            path: '/system/role',
            component: 'role',
            componentPath: 'pages/sys/role/index',
            meta: {
              title: '角色管理',
              cache: true
            }
          },
          {
            name: 'UserPage',
            path: '/system/user',
            component: 'user',
            componentPath: 'pages/sys/user/index',
            meta: {
              title: '用户管理',
              cache: true
            }
          },
          {
            name: 'InterfacePage',
            path: '/system/interface',
            component: 'interface',
            meta: {
              title: '接口管理'
            }
          }
        ]
      }
    ],
    accessInterfaces: [
      {
        path: '/menu/:id',
        method: 'get'
      },
      {
        path: '/menu',
        method: 'get'
      },
      {
        path: '/menu/save',
        method: 'post'
      },
      {
        path: '/interface/paged',
        method: 'get'
      }
    ],
    isAdmin: 0,
    avatarUrl: 'https://api.adorable.io/avatars/85/abott@adorable.png'
  };
  throw new Success('获取成功', 0, data);
});
const getRandomDate = () => {
  const maxDateRandom = new Date().getTime();
  const minDateRandom = new Date(2019, 0, 1, 8).getTime();
  const randomDate = Math.floor(
    Math.random() * (maxDateRandom - minDateRandom + 1) + minDateRandom
  );
  return moment(randomDate).format('YYYY-MM-DD');
};
router.get('/v1/user/list', async (ctx, next) => {
  const personData = [];
  for (let i = 0; i < 10; i++) {
    personData.push({
      name: `person${Math.floor(Math.random() * 100 + 1)}`,
      old: Math.floor(Math.random() * 100 - 1),
      status: Math.floor(Math.random() * 2 + 1),
      created: getRandomDate()
    });
  }
  throw new Success('', '', personData);
});
router.post('/v1/user/register', async (ctx, next) => {
  const v = await new RegisterValidator().validate(ctx);

  const user = {
    email: v.get('body.email'),
    password: v.get('body.password'),
    nickname: v.get('body.nickname')
  };
  const r = await User.create(user);

  // success.data=user
  throw new Success('', '', r);
});
router.get('/v1/user', async (ctx, next) => {
  const v = await new UserValidator().validate(ctx);
  const email = v.get('query.email');
  let user;
  user = await User.getUserByEmail(email);
  if (user) {
    throw new Success('', '', user);
  } else {
    throw new NotFound('暂无该账号');
  }
});
router.post('/:id', async (ctx, netx) => {
  ctx.body = {
    err_msg: 'success'
  };
});
module.exports = router;
