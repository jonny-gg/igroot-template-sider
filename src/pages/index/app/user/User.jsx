import React, { Component } from 'react'
import { Menu, Dropdown, Icon, Modal, message } from 'igroot'
import { logout } from '@/util/function'

const { confirm } = Modal
const { Item, Divider } = Menu
export class User extends Component {
  state = {
    username: JSON.parse(localStorage.getItem('cname'))
  }

  componentWillMount() {
    // new Proto().getUserInfo().then(({ cname = '未登录' }) => this.setState({ username: cname }))
  }

  /**
   * 退出
   */
  logout = () => {
    confirm({
      title: '提示信息',
      content: '确定注销当前账号吗?',
      onOk() {
        message.success('登出成功')
        logout()
      }
    })
  }

  render() {
    const { username } = this.state
    const menu = (
      <Menu onClick={this.logout}>
        <Item key="0">
          <a>退出</a>
        </Item>
      </Menu>
    )

    return (
      <div id="user">
        <Dropdown overlay={menu} trigger={['click']}>
          <a>
            {username}
            <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    )
  }
}
