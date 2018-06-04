
import './index.scss'

import React, { Component } from 'react'
import { Card } from 'igroot'
import { PageHeader } from '@/components/PageHeader'

import { setStorageItem } from '@/util/function'
import { version } from '@/config/version'

const _VERSION_KEY_ = '_VERSION_KEY_'

/**
 * 版本升级详情
 */
export class VersionDetail extends Component {
  versionList = []

  componentWillMount() {
    const { current } = version
    const detail = version[current]

    Object.keys(version).map(key => {
      if (key !== 'current') {
        version[key].v = key
        version[key].isCurrent = (key === version['current'])

        this.versionList.push(version[key])
      }
    })

    setStorageItem(`${_VERSION_KEY_}${detail.time}`, true)
  }

  render() {
    return (
      <div className="version-detail">
        <PageHeader title="版本升级通知">
          {
            this.versionList.map((item, index) => (
              <Card
                key={index}
                title={`${item.isCurrent ? '[最新版]' : ''} ${item.v} ${item.title}`}
              >
                <div className="detail">
                  <p className="time">发布时间: {item.time}</p>
                  {
                    item.content.map((c, i) => (
                      <p key={i}>{c}</p>
                    ))
                  }
                </div>
              </Card>
            ))
          }
        </PageHeader>
      </div>
    )
  }
}
