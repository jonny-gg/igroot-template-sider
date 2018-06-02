import './index.scss'

import React, { Component } from 'react'
import { Row, Card } from 'igroot'

export class PageHeader extends Component {

  render() {
    const { title, children, loading } = this.props

    return (
      <div className="page-header">
        <Row>
          <h1 className="title">{title}</h1>
        </Row>
        <Row>
          <div className="page-content">
            <Card loading={!!loading}>
              {children}
            </Card>
          </div>
        </Row>
      </div>
    )
  }
}
