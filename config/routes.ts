export default [
  {
    path: '/',
    component: '@/layouts/index',
    name: 'base',
    routes: [
      {
        name: '企业中心',
        icon: 'icon-xuefenjichaxun-01',
        path: '/',
        redirect: '/enterprise/info',
      },
      {
        path: '/user',
        routes: [
          {
            path: '/user',
            routes: [
              {
                name: '用户登录',
                path: '/user/login',
                component: './user/Login',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        name: '企业管理',
        icon: 'icon-kongjiaoshichaxun-01',
        path: '/enterprise',
        routes: [
          {
            path: '/enterprise/info',
            name: '企业信息',
            icon: 'smile',
            component: './Enterprise/index.tsx',
          },
          {
            path: '/enterprise/member',
            name: '成员管理',
            icon: 'smile',
            component: './Enterprise/member.tsx',
          },
          {
            path: '/enterprise/asset',
            name: '资产信息',
            icon: 'smile',
            component: './Enterprise/assets.tsx',
          },
          {
            path: '/enterprise/account',
            name: '账户信息',
            icon: 'smile',
            fastRefresh: true,
            component: './Enterprise/account.tsx',
          },
        ],
      },
      {
        name: '个人信息',
        icon: 'icon-kongjiaoshichaxun-01',
        path: '/userinfo',
        routes: [
          {
            path: '/userinfo/index',
            name: '我的资料',
            icon: 'smile',
            component: './user/info/index.tsx',
          },
        ],
      },
      {
        name: '系统通知',
        icon: 'icon-yixuankecheng-01',
        path: '/message',
        routes: [
          {
            path: '/message/index',
            name: '消息中心',
            icon: 'smile',
            component: './message/index.tsx',
          },
        ],
      },
      {
        name: '招聘管理',
        icon: 'icon-ershoushichang-01',
        path: '/employ',
        routes: [
          {
            path: '/employ/position',
            name: '职位管理',
            icon: 'smile',
            routes: [
              {
                path: '/employ/position',
                name: '职位管理',
                icon: 'smile',
                hideInMenu: true,
                component: './Employ/index.tsx',
              },
              {
                path: '/employ/position/publish',
                name: '发布职位',
                icon: 'smile',
                hideInMenu: true,
                component: './Employ/publish.tsx',
              },
              {
                path: '/employ/position/edit',
                name: '职位详情',
                icon: 'smile',
                hideInMenu: true,
                component: './Employ/edit.tsx',
              },
            ],
          },
          {
            path: '/employ/people',
            name: '人才管理',
            icon: 'smile',
            component: './Employ/people.tsx',
          },
          {
            path: '/employ/search',
            name: '寻找人才',
            icon: 'smile',
            component: './Employ/search.tsx',
          },
          {
            path: '/employ/recruitment',
            name: '招聘会记录',
            icon: 'smile',
            component: './Employ/recruitment.tsx',
          },
        ],
      },
      {
        name: '增值服务',
        icon: 'icon-ershoushichang-01',
        path: '/value-add',
        routes: [
          {
            path: '/value-add/set-meal',
            name: '套餐管理',
            icon: 'transaction',
            component: './ValueAdd/setMeal.tsx',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
