import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'igroot'
import { siderMenuConfig } from '@/config/menu'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

export class SiderMenu extends Component {
  constructor(props) {
    super(props)

    const openKeys = this.getOpenKeys()
    this.state = {
      openKeys,
    }
    this.openKeysCache = openKeys
  }

  /**
   * 当前展开的菜单项
   */
  handleOpenChange = (openKeys) => {
    this.setState({
      openKeys
    })
    this.openKeysCache = openKeys
  }

  /**
   * 获取当前展开的菜单项
   */
  getOpenKeys = () => {
    const { match } = this.props
    const matched = match.url
    let openKeys = []

    Array.isArray(siderMenuConfig)
      && siderMenuConfig.forEach((item, index) => {
        if (matched.startsWith(item.path)) {
          openKeys = [`${index}`]
        }
      })
    return openKeys
  }

  render() {
    const { location, collapsed } = this.props
    const { openKeys } = this.state
    const { pathname } = location

    return (
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[pathname]}
        defaultSelectedKeys={[pathname]}
        inlineCollapsed={collapsed}
        openKeys={openKeys}
        onOpenChange={this.handleOpenChange}
      >
        {Array.isArray(siderMenuConfig)
          && siderMenuConfig.length > 0
          && siderMenuConfig.map((nav, index) => {
            if (nav.children && nav.children.length > 0) {
              return (
                <SubMenu
                  key={index}
                  title={
                    <span>
                      {nav.icon ? (
                        <Icon size="small" type={nav.icon} />
                      ) : null}
                      <span className="ice-menu-collapse-hide">
                        {nav.name}
                      </span>
                    </span>
                  }
                >
                  {nav.children.map((item) => {
                    const linkProps = {}
                    if (item.newWindow) {
                      linkProps.href = item.path
                      linkProps.target = '_blank'
                    } else if (item.external) {
                      linkProps.href = item.path
                    } else {
                      linkProps.to = item.path
                    }
                    return (
                      <MenuItem key={item.path}>
                        <Link {...linkProps}>{item.name}</Link>
                      </MenuItem>
                    )
                  })}
                </SubMenu>
              )
            }
            const linkProps = {}
            if (nav.newWindow) {
              linkProps.href = nav.path
              linkProps.target = '_blank'
            } else if (nav.external) {
              linkProps.href = nav.path
            } else {
              linkProps.to = nav.path
            }
            return (
              <MenuItem key={nav.path}>
                <Link {...linkProps}>
                  <span>
                    {nav.icon ? (
                      <Icon size="small" type={nav.icon} />
                    ) : null}
                    <span className="ice-menu-collapse-hide">
                      {nav.name}
                    </span>
                  </span>
                </Link>
              </MenuItem>
            )
          })}
      </Menu>
    )
  }
}

