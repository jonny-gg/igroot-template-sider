/**
 * 用于配置菜单栏
 * @name 标题
 * @path 路由
 * @icon 图标
 * @children 子菜单
 */

const siderMenuConfig = [
  {
    name: 'Dashboard',
    path: '/',
    icon: 'home',
    children: [
      {
        name: '平台概况',
        path: '/',
      },
      {
        name: '列表展示',
        path: '/list',
      },
    ]
  },
  {
    name: '客户信息',
    path: '/message',
    icon: 'solution'
  }
]

export { siderMenuConfig }
