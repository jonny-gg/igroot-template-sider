import { Component } from 'react'
import { Router, Link } from 'react-router-dom'
import { Layout, Menu, Icon, BackTop } from 'igroot'
import createHashHistory from 'history/createHashHistory'

import { Routes } from './app.routers'
import { User } from './user'

// 菜单数据来源
import { getMenus } from '@/util/data'

const history = createHashHistory()
const { Header, Sider, Content, Footer } = Layout
const { Item, SubMenu } = Menu
export class App extends Component {
  state = {
    collapsed: false,
    // 可自定义菜单格式
    menus: getMenus(),
    siderTheme: 'dark' //  dark(黑色)  light(白色)
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  /**
   * 渲染菜单相关
   * 针对可点击路由的menu
   * icon 如果没有穿就有没有icon图标
   */
  renderMenus = (name, route, icon) => {
    return <Item key={`${route}`}>
      <Link to={route}>
        {icon ? <Icon type={icon} /> : ''}
        <span>{name}</span>
      </Link>
    </Item>
  }

  render() {
    const { menus, siderTheme } = this.state
    return (
      <Router history={history}>
        <Layout id="home" style={{ height: '100vh' }}>
          <Sider
            style={{ height: '100vh' }}
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            {/* logo */}
            <div className="logo"><span>Logo</span></div>
            {/* 菜单 */}
            <Menu
              mode="inline"
              theme={siderTheme}
              defaultSelectedKeys={['/list']}>
              {menus.map(({ name, route, icon, children }, index) => {
                if (!name) {
                  return <span>name属性undefined</span>
                }
                if (children && children.some(child => child.name)) {
                  return <SubMenu
                    key={`${index}`}
                    title={<span><Icon type={icon} /><span>{name}</span></span>}>
                    {children.map((item, i) => (
                      this.renderMenus(item.name, item.route)
                    ))}
                  </SubMenu>
                } else {
                  return this.renderMenus(name, route, icon)
                }
              })}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              {/* user 登录信息 */}
              <User />
            </Header>
            <Content id="content" style={{ padding: 24, background: '#f0f2f5' }}>
              <Routes />
            </Content>
            <Footer className="footer">
              copyright ©{new Date().getFullYear()} by BaiShanCloud
            </Footer>
          </Layout>
        </Layout>
      </Router>
    )
  }
}