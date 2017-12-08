import React from 'react'
import { Icon } from 'igroot'
import classNames from 'classnames'
import './index.less'
/**
 * 各种数据文案的展现方式
 * 
 * 参数 | 说明 | 类型 | 默认值
  ----|------|-----|------
  title | 标题 | ReactNode\|string | -
  subTitle | 子标题 | ReactNode\|string | -
  total | 总量 | ReactNode\|string | -
  subTotal | 子总量 | ReactNode\|string | -
  status | 增加状态 | 'up \| down' | -
  theme | 状态样式 | string | 'light'
  gap | 设置数字和描述直接的间距（像素） | number | 8
 */
export default ({
  theme, title, subTitle, total, subTotal, status, suffix, gap, ...rest
}) => (
    <div
      className={
        classNames("numberInfo", {
          [`numberInfo${theme}`]: theme,
        })
      }
      {...rest}
    >
      {title && <div className="numberInfoTitle">{title}</div>}
      {subTitle && <div className="numberInfoSubTitle">{subTitle}</div>}
      <div className="numberInfoValue" style={gap ? { marginTop: gap } : null}>
        <span>
          {total}
          {suffix && <em className="suffix">{suffix}</em>}
        </span>
        {
          (status || subTotal) && (
            <span className="subTotal">
              {subTotal}
              {status && <Icon type={`caret-${status}`} />}
            </span>
          )
        }
      </div>
    </div>
  )
