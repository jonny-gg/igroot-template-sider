import { Card, Spin } from 'igroot'
import classNames from 'classnames'

import './index.less'

export const ChartCard = ({
  loading = false, contentHeight, title, avatar, action, total, footer, children, ...rest
}) => {
  const content = (
    <div className="chartCard">
      <div
        className={classNames('chartTop', { 'chartTopMargin': (!children && !footer) })}
      >
        <div className="avatar">
          {
            avatar
          }
        </div>
        <div className="metaWrap">
          <div className="meta">
            <span className="title">{title}</span>
            <span className="action">{action}</span>
          </div>
          {
            // eslint-disable-next-line
            (total !== undefined) && (<div className="total" dangerouslySetInnerHTML={{ __html: total }} />)
          }
        </div>
      </div>
      {
        children && (
          <div className="content" style={{ height: contentHeight || 'auto' }}>
            <div className={contentHeight && 'contentFixed'}>
              {children}
            </div>
          </div>
        )
      }
      {
        footer && (
          <div className={classNames('footer', { 'footerMargin': !children })}>
            {footer}
          </div>
        )
      }
    </div>
  )

  return (
    <Card
      bodyStyle={{ padding: '20px 24px 8px 24px' }}
      {...rest}
    >
      {<Spin spinning={loading}>{content}</Spin>}
    </Card>
  )
}