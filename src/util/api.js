import { httpRequest } from './http_request'
import { notification } from 'igroot'

// error 弹出锁, 避免弹出框过多
let errorLock = false

function warp(method) {
  return (data, showSuccessMsg = true) => {
    return httpRequest[method](this.url, data, {}, {})
      .then(res => res.json())
      .then(json => {
        if (json.code !== 0) {
          // 弹出提示框
          if (!errorLock) {
            errorLock = true
            setTimeout(() => errorLock = false, 2000)

            notification.error({
              message: `请求失败 code: ${json.code}`,
              description: json.msg ? json.msg : json.message || ''
            })
          }
        } else
          showSuccessMsg && notification.success({
            message: '请求成功',
            description: json.msg ? json.msg : ''
          })

        return json
      })

      .catch(err => {
        notification.error({
          message: '请求失败',
          description: '错误信息请打开控制台查看'
        })

        throw err
      })
  }
}

export class ApiBase {
  constructor(configs) {
    const confType = typeof configs

    if (confType === 'object')
      this.url = APP_CONFIG[configs.group].apiDomain + configs.url

    else if (confType === 'string')
      this.url = APP_CONFIG.default.apiDomain + configs

    else
      throw new TypeError('API object constructor argument must be the object or string')
  }

  // 按条件返回对象数组
  get(data, headers = {}, fetchObj = {}) {
    return httpRequest.get(this.url, data, headers, fetchObj)
      .then(res => {
        if (res.code !== 0)
          notification.error({
            message: `请求失败 code: ${res.code}`,
            description: res.msg ? res.msg : res.message || ''
          })

        return res
      })
  }

  post = warp.call(this, 'post')
  put = warp.call(this, 'put')
  delete = warp.call(this, 'delete')
}
