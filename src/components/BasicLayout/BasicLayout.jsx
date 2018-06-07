import './index.scss'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Layout, Icon, Tooltip, message } from 'igroot'

import { Logo } from './Logo'
import { SiderMenu } from './SiderMenu'
import { Notice } from './Notice'

import { getStorageItem } from '@/util/function'
import { getLogoutUrl } from '@/util/sso'

const { Header, Sider, Content, Footer } = Layout


/**
 * 基础布局
 */

@withRouter
export class BasicLayout extends Component {
  state = {
    collapsed: false
  }

  handleToggle = () => {
    const { collapsed } = this.state 
    this.setState({
      collapsed: !collapsed
    })
  }

  render() {
    const { location, match, theme } = this.props
    const { collapsed } = this.state
    const userName = getStorageItem('cname') || '无名氏'

    return (
      <Layout className="basic-layout">
        <Sider
          trigger={null}
          width={240}
          collapsible
          collapsed={collapsed}
        >
          <Logo collapsed={collapsed} />
          <SiderMenu 
            location={location} 
            match={match} 
            theme={theme}
            collapsed={collapsed} 
          />
        </Sider>
        <Layout>
          <Header className="header">
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.handleToggle}
            />
            <Notice />
            <div className="user-info">
              <div className="account">
                {userName}
                <a href={getLogoutUrl()}> 退出</a>
              </div>
            </div>
          </Header>
          <div className="main">
            <Content className="content">
              {this.props.children}
            </Content>
            <Footer className="footer">
              Copyright <Icon type="copyright" />2018 白山云科技有限公司
            </Footer>
          </div>
        </Layout>
      </Layout>
    )
  }
}
