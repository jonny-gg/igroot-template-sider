import React from 'react'
import { notification, message } from 'igroot'
import Fetch from 'igroot-fetch'

import { getDomain } from '@/util/function'

window.Fetch = Fetch
window.React = React

Fetch.setDomain(getDomain())

/**
 * //需要自定义网络错误处理 请重写以下这个方法
 * handleNetErrors: handleNetErrors(),
 * 
 * //需要自定义HTTP错误处理 请重写以下这个方法
 * handleHttpErrors: handleHttpErrors()
 */
const error_config = {
  handleGraphQLErrors: this.handleGraphQLErrors,
}
// GraphQL 错误处理
const handleGraphQLErrors = (errors, data) => {
  const { message, error_code, path } = errors[0]

  notification.error({
    placement: 'bottomRight',
    message: `操作【${path[0]}】失败`,
    description: `错误信息:${message}`,
  })

  throw errors[0]
}

window.Client = Fetch('/graphql', error_config)

/**
 * 如果您的系统需要对接多个后端,
 * 请打开以下注释并
 * 修改模块名的名称
 */
// window.Client2 = Fetch('模块名/graphql', {
//   handleGraphQLErrors: this.aaa,
// })
