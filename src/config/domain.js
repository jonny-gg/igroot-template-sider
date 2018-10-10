/**
 * 用于环境配置，根据 host 情况来配置对应的后端服务器接口
 * @host 待匹配的 host 地址
 * @domain 待匹配的后端服务地址
 */

export const domainList = [
  {
    host: /localhost/,
    domain: 'http://xxx(后端的API地址)'
  },
  {
    host: /xxxx\.baishancloud\.com/, // 如果是个域名,请注意中间的点的转换
    domain: 'http://xxx(后端的API地址)'
  }
]
