import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown } from 'igroot'
import numeral from 'numeral'
import { Bar, Line, Pie, Point } from 'ercharts'
import Trend from '@/components/trend'
import NumberInfo from '@/components/numberInfo'
import { getTimeDistance } from '@/util/function'

import styles from './index.less'

const { TabPane } = Tabs
const { RangePicker } = DatePicker

const rankingListData = []
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `节点 ${i} `,
    total: 323234,
  })
}
@connect(state => ({
  chart: state.chart,
}))
/**
 * 分析大盘页
 */
export class Analysis extends Component {
  render() {
    return (
      <div>
        Analysis
      </div>
    )
  }
}