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
        component: './Enterprise/assets.tsx',
      },
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
