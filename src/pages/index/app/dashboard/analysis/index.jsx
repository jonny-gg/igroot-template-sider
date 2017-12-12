import { Component } from 'react'
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown } from 'igroot'
import numeral from 'numeral'
import { Line, Bar, Pie } from 'ercharts'
import { ChartCard } from '@/components/charts/chart-card'
import { Field } from '@/components/charts/field'
import Trend from '@/components/trend'
import NumberInfo from '@/components/number-info'
import { getTimeDistance, yuan } from '@/util/function'

// 模拟数据
import { chartData, chartTableData } from '@/util/data'

import './index.less'

const { TabPane } = Tabs
const { RangePicker } = DatePicker

const rankingListData = []
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `节点 ${i} `,
    total: 323234,
  })
}

export class Analysis extends Component {
  state = {
    loading: true,
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: [],
    chartData: {},
    chartTableList: []
  }

  componentWillMount() {
    this.setState({ chartData, chartTableList: chartTableData() })
  }


  componentDidMount() {
    setTimeout(() => { this.setState({ loading: false }) }, 3000)
  }

  componentWillUnmount() {

  }

  handleChangeSalesType = (e) => {
    this.setState({
      salesType: e.target.value,
    })
  }

  handleTabChange = (key) => {
    this.setState({
      currentTabKey: key,
    })
  }

  handleRangePickerChange = (rangePickerValue) => {
    this.setState({
      rangePickerValue,
    })
  }

  selectDate = (type) => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    })

  }

  isActive(type) {
    const { rangePickerValue } = this.state
    const value = getTimeDistance(type)
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return
    }
    if (rangePickerValue[0].isSame(value[0], 'day') && rangePickerValue[1].isSame(value[1], 'day')) {
      return 'returnentDate'
    }
  }

  render() {
    const { rangePickerValue, salesType, currentTabKey, loading, chartData, chartTableList } = this.state
    const { visitData } = chartData
    // const {
    //   visitData,
    //   visitData2,
    //   salesData,
    //   searchData,
    //   offlineData,
    //   offlineChartData,
    //   salesTypeData,
    //   salesTypeDataOnline,
    //   salesTypeDataOffline,
    // } = chart

    const salesPieData = salesType === 'all'
      ? visitData.data
      :      (salesType === 'online' ? visitData.data : visitData.data)

    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    )

    const iconGroup = (
      <span className="iconGroup">
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    )

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

    const columns = [
      {
        title: '排名',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: '搜索关键词',
        dataIndex: 'keyword',
        key: 'keyword',
        render: text => <a href="/">{text}</a>,
      },
      {
        title: '用户数',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        className: 'nRight',
      },
      {
        title: '周涨幅',
        dataIndex: 'range',
        key: 'range',
        sorter: (a, b) => a.range - b.range,
        render: (text, record) => (
          <Trend flag={record.status === 1 ? 'down' : 'up'}>
            <span style={{ marginRight: 4 }}>{text}%</span>
          </Trend>
        ),
        align: 'right',
      },
    ]
    const offlineData = [
      { name: '节点0', cvr: 0.9 },
      { name: '节点1', cvr: 0.5 },
      { name: '节点2', cvr: 0.6 },
      { name: '节点3', cvr: 0.7 },
      { name: '节点4', cvr: 0.9 },
      { name: '节点5', cvr: 0.3 },
      { name: '节点6', cvr: 0.2 },
      { name: '节点7', cvr: 0.5 },
      { name: '节点8', cvr: 0.8 },
      { name: '节点9', cvr: 0.6 },
    ]
    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name)

    const CustomTab = ({ data, currentTabKey: currentKey }) => (
      <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
        <Col span={12}>
          <NumberInfo
            title={data.name}
            subTitle="转化率"
            gap={2}
            total={`${data.cvr * 100}%`}
            theme={(currentKey !== data.name) && 'light'}
          />
        </Col>
        <Col span={12} style={{ paddingTop: 36 }}>
          <Pie
            ring
            height="60"
            legeng={false}
            data={visitData.data}
            col={visitData.col}
          />
        </Col>
      </Row>
    )

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    }

    return (
      <div>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="总销售额"
              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
              total={yuan(126560)}
              footer={<Field label="日均销售额" value={`￥${numeral(12423).format('0,0')}`} />}
              contentHeight={65}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                周同比<span className="trendText">12%</span>
              </Trend>
              <Trend flag="down">
                日环比<span className="trendText">11%</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="访问量"
              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
              total={numeral(8865).format('0,0')}
              footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
              contentHeight={65}
            >
              <Line
                area
                tooltip="cross"
                legend={false}
                height={60}
                data={visitData.data}
                col={visitData.col}
              />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="支付笔数"
              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
              total={numeral(6560).format('0,0')}
              footer={<Field label="转化率" value="60%" />}
              contentHeight={65}
            >
              <Bar
                tooltip="cross"
                legend={false}
                height={60}
                data={visitData.data}
                col={visitData.col}
              />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="运营活动效果"
              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
              total="78%"
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  <Trend flag="up" style={{ marginRight: 16 }}>
                    周同比<span className="trendText">12%</span>
                  </Trend>
                  <Trend flag="down">
                    日环比<span className="trendText">11%</span>
                  </Trend>
                </div>
              }
              contentHeight={65}
            >
              <Line
                area
                tooltip="cross"
                legend={false}
                height={60}
                data={visitData.data}
                col={visitData.col}
              />
              {/* <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" /> */}
            </ChartCard>
          </Col>
        </Row>

        <Card
          loading={loading}
          bordered={false}
          bodyStyle={{ padding: 0 }}
        >
          <div className="salesCard">
            <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="销售额" key="sales">
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className="salesBar">
                      <Bar
                        tooltip="shadow"
                        legend={false}
                        height={295}
                        data={visitData.data}
                        col={visitData.col}
                      />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className="salesRank">
                      <h4 className="rankingTitle">门店销售额排名</h4>
                      <ul className="rankingList">
                        {
                          rankingListData.map((item, i) => (
                            <li key={item.title}>
                              <span className={(i < 3) ? 'active' : ''}>{i + 1}</span>
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
              <TabPane tab="访问量" key="views">
                <Row gutter={72}>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className="salesBar">
                      <Bar
                        tooltip="shadow"
                        legend={false}
                        height={292}
                        data={visitData.data}
                        col={visitData.col}
                      />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className="salesRank">
                      <h4 className="rankingTitle">门店访问量排名</h4>
                      <ul className="rankingList">
                        {
                          rankingListData.map((item, i) => (
                            <li key={item.title}>
                              <span className={(i < 3) && 'active'}>{i + 1}</span>
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

        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              bordered={false}
              title="线上热门搜索"
              extra={iconGroup}
              style={{ marginTop: 24 }}
            >
              <Row gutter={68}>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <NumberInfo
                    subTitle={
                      <span>
                        搜索用户数
                        <Tooltip title="指标文案">
                          <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
                        </Tooltip>
                      </span>
                    }
                    gap={8}
                    total={numeral(12321).format('0,0')}
                    status="up"
                    subTotal={17.1}
                  />
                  <Line
                    area
                    tooltip="cross"
                    legend={false}
                    height={60}
                    data={visitData.data}
                    col={visitData.col}
                  />
                </Col>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <NumberInfo
                    subTitle="人均搜索次数"
                    total={2.7}
                    status="down"
                    subTotal={26.2}
                    gap={8}
                  />
                  <Line
                    area
                    tooltip="cross"
                    legend={false}
                    height={60}
                    data={visitData.data}
                    col={visitData.col}
                  />
                </Col>
              </Row>
              <Table
                rowKey={record => record.index}
                size="small"
                columns={columns}
                dataSource={chartTableList}
                pagination={{
                  style: { marginBottom: 0 },
                  pageSize: 5,
                }}
              />
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className="salesCard"
              bordered={false}
              title="销售额类别占比"
              bodyStyle={{ padding: 24 }}
              extra={(
                <div className="salesCardExtra">
                  {iconGroup}
                  <div>
                    <Radio.Group value={salesType} onChange={this.handleChangeSalesType}>
                      <Radio.Button value="all">全部渠道</Radio.Button>
                      <Radio.Button value="online">线上</Radio.Button>
                      <Radio.Button value="offline">门店</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              )}
              style={{ marginTop: 24, minHeight: 509 }}
            >
              <h4 style={{ marginTop: 8, marginBottom: 32 }}>销售额</h4>
              <Pie
                title="销售额"
                ring
                data={visitData.data}
                col={visitData.col}
                height={248}
                setting={{
                  legend: {
                    orient: 'vertical',
                    x: 'right',
                  }
                }}
              />
            </Card>
          </Col>
        </Row>

        <Card
          loading={loading}
          className="offlineCard"
          bordered={false}
          bodyStyle={{ padding: '0 0 32px 0' }}
          style={{ marginTop: 32 }}
        >
          <Tabs
            activeKey={activeKey}
            onChange={this.handleTabChange}
          >
            {
              offlineData.map(shop => (
                <TabPane
                  tab="tab1"
                  key={shop.name}
                >
                  <div style={{ padding: '0 24px' }}>
                    <Line
                      tooltip="cross"
                      height="290"
                      data={visitData.data}
                      col={['date', 'bandwidth', 'request']}
                    />
                  </div>
                </TabPane>)
              )
            }
          </Tabs>
        </Card>
      </div>
    )
  }
}
