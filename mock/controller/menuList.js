const data = [
  {
    path: '/',
    component: 'Layout',
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: '@/views/index/index',
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/appUser/pm',
    component: 'Layout',
    redirect: 'noRedirect',
    name: 'Pm',
    meta: {
      title: '项目管理',
      icon: 'window-maximize',
      permissions: ['admin'],
    },
    children: [
      {
        path: 'pmList',
        name: 'PmList',
        component:'@/views/appUser/pm/pmList/index',
        meta: {
          title: '项目列表'
        },
      },
      {
        path: 'contract',
        name: 'Contract',
        component:'@/views/appUser/pm/contract/index',
        meta: {
          title: '合同管理',
        },
      },
      {
        path: 'panoramicPlan',
        name: 'PanoramicPlan',
        component:'@/views/appUser/pm/panoramicPlan/index',
        meta: {
          title: '全景计划',
        },
      },
    ],
  },
  {
    path: '/appUser/sysSet',
    component: 'Layout',
    redirect: 'noRedirect',
    name: 'SysSet',
    alwaysShow: true,
    meta: {
      title: '系统设置',
      icon: 'cog',
      permissions: ['admin'],
    },
    children: [
      {
        path: 'earlyWarning',
        name: 'EarlyWarning',
        component:'@/views/appUser/sysSet/earlyWarning/index',
        meta: {
          title: '预警设置',
        },
      },
    ],
  },
  {
    path: '/appUser/warningInfo',
    component: 'Layout',
    redirect: 'noRedirect',
    children: [
      {
        path: 'warningInfo',
        name: 'WarningInfo',
        component:'@/views/appUser/warningInfo/index',
        meta: {
          title: '预警信息',
          icon: 'bars',
        },
      },
    ],
  },
  {
    path: '/appUser/commission',
    component: 'Layout',
    redirect: 'noRedirect',
    children: [
      {
        path: 'commission',
        name: 'Commission',
        component:'@/views/appUser/commission/index',
        meta: {
          title: '代办事项',
          icon: 'bell',
        },
      },
    ],
  },
  {
    path: '/appUser/systemNotice',
    component: 'Layout',
    redirect: 'noRedirect',
    children: [
      {
        path: 'systemNotice',
        name: 'SystemNotice',
        component:'@/views/appUser/systemNotice/index',
        meta: {
          title: '系统公告',
          icon: 'mail-bulk',
        },
      },
      {
        path: 'add',
        name: 'add',
        hidden: true,
        component:'@/views/appUser/systemNotice/components/add',
        meta: {
          title: '编辑系统公告',
        },
      },
    ],
  },
  {
    path: '/personnelManagement',
    component: 'Layout',
    redirect: 'noRedirect',
    name: 'PersonnelManagement',
    meta: { title: '人员', icon: 'users-cog', permissions: ['admin'] },
    children: [
      {
        path: 'userManagement',
        name: 'UserManagement',
        component: '@/views/personnelManagement/userManagement/index',
        meta: { title: '用户管理' },
      },
      {
        path: 'roleManagement',
        name: 'RoleManagement',
        component: '@/views/personnelManagement/roleManagement/index',
        meta: { title: '角色管理' },
      },
      {
        path: 'menuManagement',
        name: 'MenuManagement',
        component: '@/views/personnelManagement/menuManagement/index',
        meta: { title: '菜单管理', badge: 'New' },
      },
    ],
  },
  {
    path: '/appUser/logList',
    component: 'Layout',
    redirect: 'noRedirect',
    children: [
      {
        path: 'logList',
        name: 'LogList',
        component:'@/views/appUser/logList/index',
        meta: {
          title: '操作日志',
          icon: 'list-alt',
        },
      },
    ],
  },
  {
    path: '/vab',
    component: 'Layout',
    redirect: 'noRedirect',
    name: 'Vab',
    alwaysShow: true,
    meta: { title: '组件', icon: 'cloud' },
    children: [
      {
        path: 'permissions',
        name: 'Permission',
        component: '@/views/vab/permissions/index',
        meta: {
          title: '权限控制',
          permissions: ['admin', 'editor'],
          badge: 'New',
        },
      },
      {
        path: 'icon',
        component: 'EmptyLayout',
        redirect: 'noRedirect',
        name: 'Icon',
        meta: {
          title: '图标',
          permissions: ['admin'],
        },
        children: [
          {
            path: 'awesomeIcon',
            name: 'AwesomeIcon',
            component: '@/views/vab/icon/index',
            meta: { title: '常规图标' },
          },
          {
            path: 'remixIcon',
            name: 'RemixIcon',
            component: '@/views/vab/icon/remixIcon',
            meta: { title: '小清新图标' },
          },
          {
            path: 'colorfulIcon',
            name: 'ColorfulIcon',
            component: '@/views/vab/icon/colorfulIcon',
            meta: { title: '多彩图标' },
          },
        ],
      },
      {
        path: 'table',
        component: '@/views/vab/table/index',
        name: 'Table',
        meta: {
          title: '表格',
          permissions: ['admin'],
        },
      },
      {
        path: 'map',
        name: 'Map',
        component: '@/views/vab/map/index',
        meta: { title: '地图', permissions: ['admin'], badge: 'Pro' },
      },
      {
        path: 'webSocket',
        name: 'WebSocket',
        component: '@/views/vab/webSocket/index',
        meta: { title: 'webSocket', permissions: ['admin'] },
      },
      {
        path: 'form',
        name: 'Form',
        component: '@/views/vab/form/index',
        meta: { title: '表单', permissions: ['admin'] },
      },
      {
        path: 'element',
        name: 'Element',
        component: '@/views/vab/element/index',
        meta: { title: '常用组件', permissions: ['admin'] },
      },
      {
        path: 'tree',
        name: 'Tree',
        component: '@/views/vab/tree/index',
        meta: { title: '树', permissions: ['admin'] },
      },
      {
        path: 'verify',
        name: 'Verify',
        component: '@/views/vab/verify/index',
        meta: { title: '验证码', permissions: ['admin'] },
      },
      {
        path: 'menu1',
        component: '@/views/vab/nested/menu1/index',
        name: 'Menu1',
        alwaysShow: true,
        meta: {
          title: '嵌套路由 1',
          permissions: ['admin'],
        },
        children: [
          {
            path: 'menu1-1',
            name: 'Menu1-1',
            alwaysShow: true,
            meta: { title: '嵌套路由 1-1' },
            component: '@/views/vab/nested/menu1/menu1-1/index',

            children: [
              {
                path: 'menu1-1-1',
                name: 'Menu1-1-1',
                meta: { title: '嵌套路由 1-1-1' },
                component: '@/views/vab/nested/menu1/menu1-1/menu1-1-1/index',
              },
            ],
          },
        ],
      },
      {
        path: 'magnifier',
        name: 'Magnifier',
        component: '@/views/vab/magnifier/index',
        meta: { title: '放大镜', permissions: ['admin'] },
      },
      {
        path: 'loading',
        name: 'Loading',
        component: '@/views/vab/loading/index',
        meta: { title: 'loading', permissions: ['admin'] },
      },
      {
        path: 'player',
        name: 'Player',
        component: '@/views/vab/player/index',
        meta: { title: '视频播放器', permissions: ['admin'] },
      },
      {
        path: 'markdownEditor',
        name: 'MarkdownEditor',
        component: '@/views/vab/markdownEditor/index',
        meta: { title: 'markdown编辑器', permissions: ['admin'] },
      },
      {
        path: 'editor',
        name: 'Editor',
        component: '@/views/vab/editor/index',
        meta: { title: '富文本编辑器', permissions: ['admin'], badge: 'New' },
      },
      {
        path: 'backToTop',
        name: 'BackToTop',
        component: '@/views/vab/backToTop/index',
        meta: { title: '返回顶部', permissions: ['admin'] },
      },
      {
        path: 'lodash',
        name: 'Lodash',
        component: '@/views/vab/lodash/index',
        meta: { title: 'lodash', permissions: ['admin'] },
      },
      {
        path: 'smallComponents',
        name: 'SmallComponents',
        component: '@/views/vab/smallComponents/index',
        meta: { title: '小组件', permissions: ['admin'] },
      },

      {
        path: 'upload',
        name: 'Upload',
        component: '@/views/vab/upload/index',
        meta: { title: '上传', permissions: ['admin'] },
      },
      {
        path: 'log',
        name: 'Log',
        component: '@/views/vab/errorLog/index',
        meta: { title: '错误日志模拟', permissions: ['admin'] },
      },
      {
        path: 'more',
        name: 'More',
        component: '@/views/vab/more/index',
        meta: { title: '关于', permissions: ['admin'] },
      },
    ],
  },
  {
    path: '/error',
    component: 'EmptyLayout',
    redirect: 'noRedirect',
    name: 'Error',
    meta: { title: '错误页', icon: 'bug' },
    children: [
      {
        path: '401',
        name: 'Error401',
        component: '@/views/401',
        meta: { title: '401' },
      },
      {
        path: '404',
        name: 'Error404',
        component: '@/views/404',
        meta: { title: '404' },
      },
    ],
  },
]
module.exports = [
  {
    url: '/menuList/list',
    type: 'post',
    response() {
      return { code: 200, msg: 'success', data }
    },
  },
]
