export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
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
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    name: 'enterprise',
    icon: 'table',
    path: '/enterprise',
    routes: [
      {
        path: '/enterprise/info',
        name: 'info',
        icon: 'smile',
        component: './Enterprise/index.tsx',
      },
      {
        path: '/enterprise/member',
        name: 'member',
        icon: 'smile',
        component: './Enterprise/member.tsx',
      },
      {
        path: '/enterprise/asset',
        name: 'asset',
        icon: 'smile',
        fastRefresh:true,
        component: './Enterprise/assets.tsx',
      },
      {
        path: '/enterprise/account',
        name: 'account',
        icon: 'smile',
        fastRefresh:true,
        component: './Enterprise/account.tsx',
      },
      {
        path: '/enterprise/withdraw',
        name: 'asset',
        icon: 'smile',
        hideInMenu:true,
        component: './Enterprise/withDraw.tsx',
      },
    ],
  },
  {
    name: 'userinfo',
    icon: 'table',
    path: '/userinfo',
    routes: [
      {
        path: '/userinfo/index',
        name: 'index',
        icon: 'smile',
        component: './user/info/index.tsx',
      }
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },

  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
