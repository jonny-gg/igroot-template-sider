import { Client } from '@@'
import moment from 'moment'
import numeral from 'numeral'
/**
 * API 扩展函数
 * @param {Object} content 扩展对象
 */
export function extend(content) {
  return api => {
    Object.keys(content).forEach(key => api[key] = content[key])

    return api
  }
}

/**
 * 请求 url 参数解析
 * @param {string} url
 */
export function parseUrlParams(url) {
  const result = {}
  const params = url.split('?')[1]

  params && params.split('&').forEach(item => {
    const pair = item.split('=')
    result[pair[0]] = pair[1]
  })

  return result
}

/**
 * 复制文本内容至粘贴板
 * @param  {string}   text  文本内容
 * @return {boolean}        是否复制成功
 */
export function copy(text) {
  const isRTL = document.documentElement.getAttribute('dir') === 'rtl'
  const fakeElem = document.createElement('textarea')

  fakeElem.style.fontSize = '12pt'
  fakeElem.style.border = '0'
  fakeElem.style.padding = '0'
  fakeElem.style.margin = '0'
  fakeElem.style.position = 'absolute'
  fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px'
  const yPosition = window.pageYOffset || document.documentElement.scrollTop
  fakeElem.style.top = `${yPosition}px`

  fakeElem.setAttribute('readonly', '')
  fakeElem.value = text

  document.body.appendChild(fakeElem)

  fakeElem.select()

  let success
  try { success = document.execCommand('Copy') } catch (err) { success = false }

  document.body.removeChild(fakeElem)

  return success
}

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val
}

export const yuan = val => `&yen; ${numeral(val).format('0,0')}`

/**
 * 根据时间获取时间间隔
 * @param {String} type 'today' | 'week' | 'month' | 'year'
 */
export function getTimeDistance(type) {
  const now = new Date()
  const oneDay = 1000 * 60 * 60 * 24

  if (type === 'today') {
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    return [moment(now), moment(now.getTime() + (oneDay - 1000))]
  }

  if (type === 'week') {
    let day = now.getDay()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)

    if (day === 0) {
      day = 6
    } else {
      day -= 1
    }

    const beginTime = now.getTime() - (day * oneDay)

    return [moment(beginTime), moment(beginTime + ((7 * oneDay) - 1000))]
  }

  if (type === 'month') {
    const year = now.getFullYear()
    const month = now.getMonth()
    const nextDate = moment(now).add(1, 'months')
    const nextYear = nextDate.year()
    const nextMonth = nextDate.month()

    return [moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`), moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000)]
  }

  if (type === 'year') {
    const year = now.getFullYear()

    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)]
  }
}