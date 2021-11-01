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
  // {
  //   path: '/welcome',
  //   name: 'welcome',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  {
    name: 'enterprise',
    icon: 'audit',
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
    icon: 'solution',
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
    name: 'message',
    icon: 'message',
    path: '/message',
    routes: [
      {
        path: '/message/index',
        name: 'index',
        icon: 'smile',
        component: './message/index.tsx',
      }
    ],
  },
  {
    name: 'employ',
    icon: 'alert',
    path: '/employ',
    routes: [
      {
        path: '/employ/position',
        name: 'position',
        icon: 'smile',
        routes: [
          {
            path:'/employ/position',
            name: 'position',
            icon: 'smile',
            hideInMenu:true,
            component: './Employ/index.tsx',
          },
          {
            path:'/employ/position/publish',
            name: 'publish',
            icon: 'smile',
            hideInMenu:true,
            component: './Employ/publish.tsx',
          },
          {
            path:'/employ/position/edit',
            name: 'edit',
            icon: 'smile',
            hideInMenu:true,
            component: './Employ/edit.tsx',
          }
        ]
      },
      {
        path: '/employ/people',
        name: 'people',
        icon: 'smile',
        component: './Employ/people.tsx',
      },
      {
        path: '/employ/search',
        name: 'search',
        icon: 'smile',
        component: './Employ/search.tsx',
      },
      {
        path: '/employ/recruitment',
        name: 'recruitment',
        icon: 'smile',
        component: './Employ/recruitment.tsx',
      },
    ],
  },
  {
    name: 'valueAdd',
    icon: 'transaction',
    path: '/value-add',
    routes: [
      {
        path: '/value-add/set-meal',
        name: 'setMeal',
        icon: 'transaction',
        component: './ValueAdd/setMeal.tsx',
      }
    ],
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  //
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    path: '/',
    redirect: '/enterprise/info',
  },
  {
    component: './404',
  },
];
