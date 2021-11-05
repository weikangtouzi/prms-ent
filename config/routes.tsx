import { SmileOutlined} from '@ant-design/icons';

export default [
  {
    path: '/',
    component: '@/layouts/index',
    name:'base',
    routes: [
      {
        name:'enterprise',
        icon:'audit',
        path: '/',
        redirect:'/enterprise/info'
      },
      {
        path: '/user',
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
        name: 'enterprise',
        icon: <SmileOutlined/>,
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
    ]
  },
  {
    component: './404',
  },
];
