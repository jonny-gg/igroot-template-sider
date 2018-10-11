import React from 'react'
import { notification, message } from 'igroot'
import Fetch from 'igroot-fetch'
import { handleTokenInvalid } from 'sso-login'
import { getDomain } from '@/util/function'

window.Fetch = Fetch
window.React = React

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

// 后端开发基于 bungalow 框架，使用这个错误处理的配置,同时请确保 igroot-fetch 的版本在 1.4.0 以前
const errorConfig = {
  handleGraphQLErrors: (errors, data) => {
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
}

// 后端开发基于 Phalcon 框架，使用这个错误处理的配置, igroot-fetch 的版本使用最新即可
const newErrorConfig = {
  handleErrors: ({ code, msg }) => {
    if (code == '44') {
      handleTokenInvalid(getDomain())
      return
    }
    if (code != 0) {
      message.error(msg)
    }
  },
  handleHttpErrors: (response) => {
    notification.error({
      message: 'Http Error',
      description: response.statusText
    })
  }
}

window.Client = Fetch(`${getDomain}/graphql`, newErrorConfig)

/**
 * 如果您的系统后端有多个业务模块,
 * 则按照以下操作
 * 每一个模块可以新挂载一个请求对象
 */
// window.ClientDemo2 = Fetch(`${getDomain}/业务模块名/graphql`, newErrorConfig)
