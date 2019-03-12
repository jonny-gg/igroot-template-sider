/**
 * 该模块主要用于路由配置
 */
// 引入异步加载组件
// import asyncComponent from 'ac'

// 引入要使用的布局组件
import { BasicLayout } from '@/components/BasicLayout'

import { Home } from './Home'
import { TableHocPage } from './TablePage'
import { NotFound } from './NotFound'
import { VersionDetail } from './VersionDetail'

// 引入渲染的页面模块
// const Home = asyncComponent(() => import('./Home'))
// const TableHocPage = asyncComponent(() => import('./TablePage'))
// const NotFound = asyncComponent(() => import('./NotFound'))
// const VersionDetail = asyncComponent(() => import('./VersionDetail'))

/**
 * @path 路由
 * @layout 布局
 * @component 组件
 */
const routerConfig = [
  {
    path: '/dashboard/gai',
    layout: BasicLayout,
    component: Home,
  },
  {
    path: '/dashboard/list',
    layout: BasicLayout,
    component: TableHocPage,
  },
  {
    path: '/version',
    layout: BasicLayout,
    component: VersionDetail,
  },
  {
    path: '*',
    layout: BasicLayout,
    component: NotFound
  }
]

export default routerConfig
