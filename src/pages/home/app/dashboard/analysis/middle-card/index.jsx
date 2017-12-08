import { Component } from 'react'
import { Card, Row, Col, Tabs, DatePicker } from 'igroot'
import numeral from 'numeral'
import { Bar } from 'ercharts'

import { getTimeDistance } from '@/util/function'
import './../index.less'

/**
 * 大盘大图部分
 * 可以显示带宽或者域名的top带宽量等
 * 可以根据时间粒度查询
 */
const { TabPane } = Tabs
const { RangePicker } = DatePicker
const rankingListData = []
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `节点 ${i} `,
    total: 323234,
  })
}
export class MiddleCard extends Component {
  state = {
    rangePickerValue: []
  }
  /**
 * 选中时间的周期
 * @param {*String} type 选中的类型 
 */
  isActive(type) {
    const { rangePickerValue } = this.state
    const value = getTimeDistance(type)
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return
    }
    if (rangePickerValue[0].isSame(value[0], 'day') && rangePickerValue[1].isSame(value[1], 'day')) {
      return "currentDate"
    }
  }
  /**
   * 时间周期后触发datepicker的值的变化
   */
  selectDate = (type) => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    })

    // this.props.dispatch({
    //   type: 'chart/fetchSalesData',
    // })
  }

  /**
   * rangePicer 改变的值渲染
   */
  handleRangePickerChange = (rangePickerValue) => {
    this.setState({
      rangePickerValue,
    })

    // this.props.dispatch({
    //   type: 'chart/fetchSalesData',
    // })
  }
  render() {
    const { rangePickerValue } = this.state
    const { chartData, loading } = this.props
    const { data, col } = chartData
    // 查询时间维度
    const salesExtra = (
      <div className="salesExtraWrap">
        <div className="salesExtra">
          <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
            今日
          </a>
          <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
            本周
          </a>
          <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
            本月
          </a>
          <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
            全年
          </a>
        </div>
        <RangePicker
          value={rangePickerValue}
          onChange={this.handleRangePickerChange}
          style={{ width: 256 }}
        />
      </div>
    )
    return (
      <div>
        <Card
          loading={loading}
          bordered={false}
          bodyStyle={{ padding: 0 }}
        >
          <div className="salesCard">
            <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="带宽" key="sales">
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className="salesBar">
                      <Bar
                        title="带宽趋势"
                        height={295}
                        col
                        data
                      />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className="salesRank">
                      <h4 className="rankingTitle">用户带宽量排名</h4>
                      <ul className="rankingList">
                        {
                          rankingListData.map((item, i) => (
                            <li key={item.title}>
                              <span className={(i < 3) ? "active" : ''}>{i + 1}</span>
                              <span>{item.title}</span>
                              <span>{numeral(item.total).format('0,0')}</span>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="请求数" key="views">
                <Row gutter={72}>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className="salesBar">
                      <Bar
                        height={292}
                        title="请求数趋势"
                        data
                        col
                      />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className="salesRank">
                      <h4 className="rankingTitle">域名请求数排名</h4>
                      <ul className="rankingList">
                        {
                          rankingListData.map((item, i) => (
                            <li key={item.title}>
                              <span className={(i < 3) && "active"}>{i + 1}</span>
                              <span>{item.title}</span>
                              <span>{numeral(item.total).format('0,0')}</span>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>
      </div>
    );
  }
}
