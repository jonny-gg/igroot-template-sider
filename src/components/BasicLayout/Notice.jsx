import './index.scss'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Tooltip, Badge, Icon } from 'igroot'

import { getStorageItem } from '@/util/function'
import { version } from '@/config/version'

const _VERSION_KEY_ = '_VERSION_KEY_'

export class Notice extends Component {
  state = {
    count: 0
  }

  componentWillMount() {
    const currentVerison = this.getCurrentVersion()
    const { current, time } = currentVerison
    const isRead = getStorageItem(`${_VERSION_KEY_}${time}`)
    const count = (isRead ? 0 : currentVerison['content'].length)

    this.setState({
      count
    })
  }

  getCurrentVersion = () => {
    const current = version['current']
    return {
      ...{ current },
      ...version[current]
    }
  }

  handleClickNotice = () => {
    this.setState({
      count: 0
    })
  }

  render() {
    const { count } = this.state
    const currentVerison = this.getCurrentVersion()

    return (
      <div className="header-notice">
        <Tooltip title="版本升级通知" placement="bottom">
          <Link to="/version">
            <Badge count={count}>
              <Icon type="bell"/>
            </Badge>
          </Link>
        </Tooltip>
      </div>
    )
  }
}
