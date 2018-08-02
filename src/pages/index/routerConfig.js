/**
 * 该模块主要用于路由配置
 */

// 引入要使用的布局组件
import { BasicLayout } from '@/components/BasicLayout'

// 引入渲染的页面模块
import { Home } from './Home'
import { DemoList } from './List'
import { NotFound } from './NotFound'
import { VersionDetail } from './VersionDetail'

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
    component: DemoList,
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
