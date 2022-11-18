export default [
  {
    path: '/',
    redirect: '/index',
  },
  {
    name: '首页',
    icon: 'icon-icon_qiyeguanli',
    path: '/index',
    component: './index/index',
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: '用户登录',
            path: '/user/login',
            component: './user/Login',
          },
          {
            name: '用户注册',
            path: '/user/register',
            component: './user/Login/register',
          },
        ],
      },
    ],
  },
  {
    name: '招聘管理',
    icon: 'icon-icon_zhaopinguanli',
    path: '/employ',
    routes: [
      {
        path: '/employ/position',
        name: '职位管理',
        icon: 'icon-icon_zhiweiguanlioff1',
        aIcon:'icon-icon_zhiweiguanlion1',
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
        path: '/employ/search',
        name: '寻找人才',
        icon: 'icon-icon_xunzhaorencaioff1',
        aIcon:'icon-icon_xunzhaorencaion1',
        component: './Employ/search.tsx',
      },
      {
        path: '/employ/people',
        name: '人才管理',
        icon: 'icon-icon_rencaiguanlioff',
        aIcon:'icon-icon_rencaiguanlion1',
        component: './Employ/people.tsx',
      },
      {
        path: '/employ/recruitment',
        name: '招聘会记录',
        disabled: true,
        icon: 'icon-icon_zhaopinhuijiluoff',
        aIcon:'icon-icon_zhaopinhuijiluon',
        component: './Employ/recruitment.tsx',
      },
    ],
  },
  {
    name: '企业管理',
    icon: 'icon-a-icon_qiyeguanli2',
    path: '/enterprise',
    routes: [
      {
        path: '/enterprise/info',
        name: '企业信息',
        icon: 'icon-icon_qiyexinxioff',
        aIcon:'icon-icon_qiyexinxion',
        component: './Enterprise/index.tsx',
      },
      {
        path: '/enterprise/member',
        name: '成员管理',
        icon: 'icon-icon_chengyuanguanlioff',
        aIcon:'icon-icon_chengyuanguanlion',
        component: './Enterprise/member.tsx',
        access: 'canAdmin',
      },
      // {
      //   path: '/enterprise/asset',
      //   name: '资产信息',
      //   icon: 'smile',
      //   component: './Enterprise/assets.tsx',
      // },
      // {
      //   path: '/enterprise/account',
      //   name: '账户信息',
      //   icon: 'smile',
      //   fastRefresh: true,
      //   component: './Enterprise/account.tsx',
      // },
    ],
  },
  {
    name: '个人信息',
    icon: 'icon-icon_gerenxinxi',
    path: '/userinfo',
    routes: [
      {
        path: '/userinfo/index',
        name: '我的资料',
        icon: 'icon-icon_wodeziliaooff',
        aIcon:'icon-icon_wodeziliaoon1',
        component: './user/info/index.tsx',
      },
    ],
  },
  {
    name: '系统通知',
    icon: 'icon-icon_xitongtongzhi1',
    path: '/message',
    disabled: true,
    routes: [
      {
        path: '/message/index',
        name: '消息中心',
        icon: 'icon-icon_xiaoxizhongxinoff',
        aIcon:'icon-icon_xiaoxizhongxinon1',
        component: './message/index.tsx',
      },
    ],
  },

  // {
  //   name: '套餐管理',
  //   icon: 'icon-icon_taocanguanli',
  //   path: '/value-add',
  //   routes: [
  //     {
  //       path: '/value-add/value-add',
  //       name: '增值服务',
  //       icon: 'transaction',
  //       component: './ValueAdd/setMeal.tsx',
  //     },
  //   ],
  // },
  {
    component: './404',
  },
];
