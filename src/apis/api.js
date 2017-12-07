import { notification } from 'igroot'
import { extend } from './extends/'

// RESTful API
export const apis = {
  
}

// GraphQL API
export const client = {
  url: 'graphql',
  options: {

    /**
     * 自定义 HTTP 错误处理函数
     * 
     * 能到这个函数, 说明状态码已经不是 200 了(调用条件是 response.status !== 200)
     * 请不要再此函数中使用 response.text(), response.json() 等方法, 会导致后续的流程错误
     * 
     * @param {Response}   response  Response 对象
     * @return {undefined}
     */
    handleHttpErrors(response) {
      notification.error({
        message: 'HTTP请求错误',
        description: `${response.status}: ${response.statusText}`
      })
    },

    /**
     * 自定义 GraphQL 错误处理函数
     * 
     * 能到这个函数, 说明响应中存在 error 对象
     * 
     * @param {array[object]}     errors GraphQL错误对象
     * @param {object}     data   GraphQL数据对象
     * @return {undefined}
     */
    handleGraphQLErrors(errors, data) {
      const { message } = errors[0]

      notification.error({
        message: 'GraphQL请求错误',
        description: `${message}`
      })
    },

    /**
     * 自定义 GraphQL 成功处理函数(仅 mutation 会触发)
     * 
     * 能到这个函数，说明 HTTP 与 GraphQL 都没有错误
     */
    handleSuccess() { notification.success({ message: '请求成功' }) }
  }
}
