import { Lokka } from 'lokka'

import { ApiBase } from '@/util/api'
import { Transport } from '@/util/transport'
import { extend } from '@/util/function'
import { apis, client } from './api'

const Api = {}

Object.keys(apis).forEach(key => {
  const api = apis[key]

  Api[key] = typeof api === 'object' && api.extend
    ? extend(api.extend)(new ApiBase(api))
    : new ApiBase(api)
})

const Client = (() => {
  const _Client = (() => {
    const type = typeof client 

    // 无 GraphQL 接口
    if (type === undefined)
      return

    // 无配置
    if (type === 'string')
      return clientHandle(client)

    // 有配置
    if (type === 'object')
      return clientHandle(client.url, client.options)

    throw new TypeError('GraphQL Client configuration error!')

    // Lokka 工厂
    function lokkaFactory(url, options) {
      return new Lokka({
        transport: new Transport(url, options)
      })
    }

    // client 处理
    function clientHandle(url, options) {
      const query = lokkaFactory(`/${url}/query`, options)

      delete options.handleSuccess

      const mutation = lokkaFactory(`/${url}/mutation`, options)

      /**
       * 双重作用域变换
       * 
       * mutate 方法调用时作用域变换路径:
       *   mutate(query) => _findFragments(query) => fragments(query)
       *   mutate(query) => send(mutation) => _transport(mutation)
       */
      query.mutate = query.mutate.bind(mutation)
      mutation._findFragments = mutation._findFragments.bind(query)

      return query
    }
  })()

  /**
   * fragment 封装
   * @param {string} type    Scheme 提供的 Type
   * @param {array}  fields  查询字段数组(字符串一维数组)
   */
  _Client.fragment = ({ type, fields }) => {
    if (!type || !Array.isArray(fields))
      throw new TypeError('type is required! And fields must be a array!')

    return _Client.createFragment(`
      fragment on ${type} {
        ${fields.join('\n  ')}
      }
    `)
  }

  return _Client
})()

export { Api, Client }
