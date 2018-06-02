import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'igroot'

export class Home extends Component {
  static displayName = 'Home'

  render() {
    return (
      <div style={styles.home}>
        <Card title="模块1" bordered={false} style={styles.marginTop}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card title="模块2" bordered={false} style={styles.marginTop}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card title="模块3" bordered={false} style={styles.marginTop}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    )
  }
}

const styles = {
  home: {
    padding: 20
  },
  marginTop: {
    marginTop: 20
  }
}