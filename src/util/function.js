import { Client } from '@@'
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

/**
 * 获取菜单列表
 * 可以通过接口动态获取
 * name     -- 菜单名称
 * route    -- 路由(前面一定要有个斜杠来区分是否跟路径)
 * icon     -- 对应的菜单前的图标
 * children -- 有对应的子菜单
 * 
 */
export const getMenus = () => {
  return [
    {
      name: 'Dashboard', route: 'dashboard', icon: 'bars',
      children: [
        { name: '分析页', route: '/dashboard/dashboard1' },
        { name: '监控页', route: '/dashboard/dashboard2' },
        { name: '工作台', route: '/dashboard/dashboard3' },
      ]
    },
    { name: '列表页', route: '/list', icon: 'file-text' },
    { name: '图表页', route: '/chart', icon: 'dot-chart' },
    { name: '表单页', route: '/form', icon: 'exception' },
    { name: '异常', route: '/error', icon: 'question-circle-o' }
  ]
}