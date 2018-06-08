import React from 'react'
import { notification } from 'igroot'
import Fetch from 'igroot-fetch'

import { getDomain } from '@/util/function'

window.Fetch = Fetch
window.React = React

Fetch.setDomain(getDomain())

/**
 * //需要自定义网络错误处理 请重写以下这个方法
 * handleNetErrors: handleNetErrors(error),
 * 
 * //需要自定义HTTP错误处理 请重写以下这个方法
 * handleHttpErrors: handleHttpErrors(response)
 * 
 * //需要自定义GraphQL错误处理 请重写以下这个方法 例如示例代码
 * handleGraphQLErrors: handleGraphQLErrors(errors, data)
 */

// GraphQL 错误处理 (示例代码)
function handleGraphQLErrors(errors, data) {
  // message 错误信息 
  // error_code 错误状态码 
  // path 当前操作的graphql方法 
  const { message, error_code, path } = errors[0]

  notification.error({
    placement: 'bottomRight',
    message: `操作【${path[0]}】失败`,
    description: `错误信息:${message}`,
  })

  throw errors[0]
}
const error_config = {
  handleGraphQLErrors: handleGraphQLErrors,
}

window.Client = Fetch('/graphql', error_config)

/**
 * 如果您的系统需要对接多个后端,
 * 请打开以下注释并
 * 修改模块名的名称
 */
// window.ClientDemo2(Demo2 使用驼峰) = Fetch('模块名/graphql', {
//   handleGraphQLErrors: this.aaa,
// })
