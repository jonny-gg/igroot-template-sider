
/**
 * 该模块主要用于获取 SSO 登录后的信息获取/退出
 * 后续可以集成在 sso-login 组件
 */

import { getDomain, getStorageItem } from '@/util/function'

const domainUrl = getDomain()

// 获取token
const getJwtToken = () => getStorageItem('jwtToken') 

// 获取账号名（英文)
const getName = () => getStorageItem('name')

// 获取中文账号名
const getCname = () => getStorageItem('cname')

// 获取权限导航
const getMenu = () => getStorageItem('menu') 

// 获取退出链接
const getLogoutUrl = () => `${domainUrl}/account/user/logout`

// 退出操作
const logout = () => {
  const logoutUrl = `${domainUrl}/account/user/logout`
  localStorage.clear()
  location.assign(logoutUrl)
}

export {
  getJwtToken,
  getName,
  getCname,
  getMenu,
  getLogoutUrl,
  logout
}