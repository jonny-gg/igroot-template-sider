let domain = ''
const host = window.location.host
const domainList = {
  /**
   * [后端地址]: [匹配前端地址的正则]
   * 
   * 例如：'http://test-roster.i.trpcdn.net': /test-api\.sso\.qingcdn\.com/
   * 意味着当访问的地址中包含字符 'test-api.sso.qingcdn.com' 时，
   * 将会使用 'http://test-roster.i.trpcdn.net' 作为 API 请求的地址
   */
  'http://172.18.11.112:23000': /(localhost|172\.18\.11\.112)/,
  'http://service-jiuhua.baishancloud.com': /jiuhua\.baishancloud\.com/,
  'https://service-jiuhua.bs58i.baishancloud.com': /jiuhua\.bs58i\.baishancloud\.com/
}

for (const _domain in domainList) {
  const regexp = domainList[_domain]
  if (regexp.test(host))
    domain = _domain
}

// if (!domain) throw new Error('Can not match the api domain! Please check your api domain config.')

export default domain
