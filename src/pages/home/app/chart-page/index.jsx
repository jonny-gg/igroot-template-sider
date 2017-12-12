import { Component } from 'react'
import { Row, Col, Tooltip, Icon } from 'igroot'
import numeral from 'numeral'
import { Line, Bar, Pie, Point, Map } from 'ercharts'

import { ChartCard } from '@/components/charts/chart-card'
import { Field } from '@/components/charts/field'
import { chartData } from '@/util/data'
/**
 * 图表页
 * 支持的图表汇总
 */
export class ChartPage extends Component {
  state = {
    chartData
  }

  render() {
    const { chartData } = this.state
    const { visitData } = chartData
    return (
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <ChartCard
              bordered={false}
              title="折线图有填充色 配置了area属性"
              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
              // total={numeral(8865).format('0,0')}
              footer={<Field label="结论性描述" value={numeral(1234).format('0,0')} />}
              contentHeight={65}
            >
              <Line
                area
                tooltip="cross"
                legend={false}
                height={100}
                data={visitData.data}
                col={visitData.col} />
            </ChartCard>
          </Col>
          <Col span={12}>
            <ChartCard
              bordered={false}
              title="折线图无填充色"
              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
              // total={numeral(8865).format('0,0')}
              footer={<Field label="结论性描述" value={numeral(1234).format('0,0')} />}
              contentHeight={65}
            >
              <Line
                tooltip="cross"
                legend={false}
                height={100}
                data={visitData.data}
                col={visitData.col} />
            </ChartCard>
          </Col>

        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <ChartCard
              bordered={false}
              title="柱状图"
              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
              // total={numeral(8865).format('0,0')}
              footer={<Field label="结论性描述" value={numeral(1234).format('0,0')} />}
              contentHeight={65}
            >
              <Bar
                tooltip="shadow"
                legend={false}
                height={100}
                data={visitData.data}
                col={visitData.col} />
            </ChartCard>
          </Col>
          <Col span={12}>
            <ChartCard
              bordered={false}
              title="环图 配置了ring属性"
              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
              // total={numeral(8865).format('0,0')}
              footer={<Field label="结论性描述" value={numeral(1234).format('0,0')} />}
              contentHeight={65}
            >
              <Pie
                ring
                rose
                data={this.state.data}
                col={this.state.col}
              />
            </ChartCard>
          </Col>
        </Row>


      </div>
    )
  }
}
