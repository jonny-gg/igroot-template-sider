import { Component } from 'react'
import { Row, Col, Tooltip, Icon } from 'igroot'
import numeral from 'numeral';
import { Bar, Line } from 'ercharts'

import { ChartCard } from '@/components/charts/chart-card'
import { Field } from '@/components/charts/field'
import { Trend } from '@/components/trend'
import { yuan } from '@/util/function'

import './../index.less'

/**
 * 头部展示的card
 */
export class TopCard extends Component {
  render() {
    /**
     * 根据屏幕大小响应式
     */
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 6,
      xl: 6,
      style: { marginBottom: 24 },
    }
    const { chartCard, loading } = this.props
    console.log(chartCard, 'ddfdfdfdf')
    // const { data = [], col = [] } = chartCard
    return (
      <div>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="板块1"
              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
              total={yuan(126560)}
              footer={<Field label="日均" value={`￥${numeral(12423).format('0,0')}`} />}
              contentHeight={46}
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
              title="板块2"
              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
              total={numeral(8846).format('0,0')}
              footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
              contentHeight={46}
            >
              <Line
                height={46}
                area
                data={chartCard.data}
                col={chartCard.col}
                tooltip="cross"
                legend={false}
              />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="板块2"
              action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
              total={numeral(6560).format('0,0')}
              footer={<Field label="转化率" value="60%" />}
              contentHeight={46}
            >
              <Bar
                area
                height={46}
                data={chartCard.data}
                col={chartCard.col}
                tooltip="shadow"
                legend={false}
              />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="板块4"
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
              contentHeight={46}
            >
              <Bar area height={46} data col />
            </ChartCard>
          </Col>
        </Row>
      </div>
    );
  }
}