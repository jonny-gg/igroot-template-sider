import { Component } from 'react'
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown } from 'igroot'
import numeral from 'numeral'
import { Bar, Line, Pie, Point } from 'ercharts'

import Trend from '@/components/trend'
import NumberInfo from '@/components/numberInfo'
import { getTimeDistance } from '@/util/function'
import { chartData } from '@/util/data'
import { TopCard } from './top-card/';
import { MiddleCard } from './middle-card/';

import './index.less'

/**
 * 分析大盘页
 */
const { TabPane } = Tabs
const { RangePicker } = DatePicker
export class Analysis extends Component {
  state = {
    loading: true,
    salesType: 'all',
    currentTabKey: '',
    chartData: {}
  }


  componentWillMount() {
    console.log(chartData, '123123123')
    this.setState({ chartData: chartData })
  }

  componentDidMount() {

    // this.props.dispatch({
    //   type: 'chart/fetch',
    // }).then(() => this.setState({ loading: false }))
  }
  componentWillUnmount() {
    // const { dispatch } = this.props
    // dispatch({
    //   type: 'chart/clear',
    // })
  }

  /**
   * 类别占比--切换操作
   */
  handleChangeSalesType = (e) => {
    this.setState({
      salesType: e.target.value,
    })
  }

  /**
   * tab切换操作
   */
  handleTabChange = (key) => {
    this.setState({
      currentTabKey: key,
    })
  }

  render() {
    const { salesType, currentTabKey, loading, chartData } = this.state
    const {
      visitData,
      // visitData2,
      // salesData,
      // searchData,
      // offlineData,
      // offlineChartData,
      // salesTypeData,
      // salesTypeDataOnline,
      // salesTypeDataOffline,
    } = chartData

    // const salesPieData = salesType === 'all' ?
    //   salesTypeData
    //   :
    //   (salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline)

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
        className: "alignRight",
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

    const offlineData = [{ name: 'dddd' }]
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
            animate={false}
            color={(currentKey !== data.name) && '#BDE4FF'}
            inner={0.55}
            tooltip={false}
            margin={[0, 0, 0, 0]}
            percent={data.cvr * 100}
            height={64}
          />
        </Col>
      </Row>
    )

    return (
      <div>
        <TopCard chartCard={visitData} loading/>
        <MiddleCard chartData={visitData} loading/>
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
                  {/* <MiniArea
                    line
                    height={45}
                    data={visitData2}
                  /> */}
                </Col>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <NumberInfo
                    subTitle="人均搜索次数"
                    total={2.7}
                    status="down"
                    subTotal={26.2}
                    gap={8}
                  />
                  {/* <MiniArea
                    line
                    height={45}
                    data={visitData2}
                  /> */}
                </Col>
              </Row>
              {/* <Table
                rowKey={record => record.index}
                size="small"
                columns={columns}
                dataSource={searchData}
                pagination={{
                  style: { marginBottom: 0 },
                  pageSize: 5,
                }}
              /> */}
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className="salesCard"
              bordered={false}
              title="类别占比"
              bodyStyle={{ padding: 24 }}
              extra={(
                <div className="salesCardExtra">
                  {iconGroup}
                  <div className="salesTypeRadio">
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
              {/* <Pie
                hasLegend
                subTitle="销售额"
                total={yuan(salesPieData.reduce((pre, now) => now.y + pre, 0))}
                data={salesPieData}
                valueFormat={val => yuan(val)}
                height={248}
                lineWidth={4}
              /> */}
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
                  tab={<CustomTab data={shop} currentTabKey={activeKey} />}
                  key={shop.name}
                >
                  <div style={{ padding: '0 24px' }}>
                    {/* <TimelineChart
                      data={offlineChartData}
                      titleMap={{ y1: '客流量', y2: '支付笔数' }}
                    /> */}
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