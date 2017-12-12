function parseUrlParams(url) {
  const result = {}
  const params = url.split('?')[1]

  params && params.split('&').forEach(item => {
    const pair = item.split('=')
    result[pair[0]] = pair[1]
  })

  return result
}

function removeParameter(str) {
  return str.replace(/(^\?|&)ticket=[^&]*(&)?/g, function (p0, p1, p2) {
    return p1 === '?' || p2 ? p1 : ''
  })
}

function isEmpty(obj) {
  for (const name in obj) {
    return false
  }

  return true
}

function setLocalStorage(key, value) {
  if (!window.localStorage) {
    alert('浏览器不支持localstorage')
    return false
  }

  const newValue = JSON.stringify(value)
  localStorage.setItem(key, newValue)
  // console.log(window.localStorage.getItem(key))
}

function getLocalStorage(key) {
  if (!window.localStorage) {
    alert('浏览器不支持localstorage')
    return false
  }

  return JSON.parse(localStorage.getItem(key))
}

/**
 * SSO统一登陆
 */
export default class SsoLogin {
  constructor(config) {
    this.config = Object.assign({
      appId: '',
      jwtTokenKey: 'JWT_TOKEN',
      userInfoKey: 'USER_INFO',
      menuInfoKey: 'MENU_INFO',
      devLogin: '',
      serverLogin: '/account/user/login',
      serverView: '/account/user/view',
      serverValidate: '/account/token/validate',
      serverLogout: '/account/user/logout',
      env: {
        local: {},
        dev: {},
        prod: {}
      },
      name: 'name',
      cname: 'cname',
    }, config)

    const { env } = this.config
    const host = location.host

    Object.keys(env).forEach(e => {
      if (env[e].regex && env[e].host && host.match(env[e].regex)) {
        this.serverHost = env[e].host
        this.serverEnv = e
      }
    })
  }

  serverEnv = 'prod'
  serverHost = location.host

  /**
   * 登录
   */
  login() {
    const { serverHost, serverEnv } = this

    const {
      appId,
      jwtTokenKey,
      userInfoKey,
      menuInfoKey,
      loginDataKey,
      serverView,
      devLogin,
      serverLogin,
      serverLogout,
      name,
      cname
    } = this.config

    return new Promise((resolve, reject) => {
      const jwtToken = getLocalStorage(jwtTokenKey)
      const query = parseUrlParams(location.href)
      let ticket = null

      if (!isEmpty(query)) {
        ticket = query.ticket

        const pathName = location.pathname || ''
        const param = location.hash.replace(/\?ticket=[^&]*/, '')
        const url = `${pathName}${param}`

        history.pushState(null, '', url)
      }

      if (!jwtToken) {
        this.checkLogin(ticket)
      } else {
        this.validateToken(() => {
          resolve()
        })
      }

    })
  }

  redirectLogin() {
    const { serverHost, serverEnv } = this

    const {
      appId,
      devLogin,
      serverLogin
    } = this.config

    if (serverEnv === 'local') {
      const cb = location.href
      const redirectUrl = `${devLogin}?appId=${appId}&callback=${cb}`
      location.assign(redirectUrl)
    } else {
      location.assign(serverHost + serverLogin)
    }
  }
  // modify by guoqn 作用域有问题 会导致redirectLogin not fount 修正
  checkLogin = (ticket) => {
    const { serverHost } = this
    const { serverView, userInfoKey, jwtTokenKey, menuInfoKey, name, cname } = this.config
    const fetchInit = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/jsoncharset=utf-8'
      }
    }

    const userInfoUrl = serverHost + serverView
    const infoUrl = ticket ? (`${userInfoUrl}?ticket=${ticket}`) : userInfoUrl

    fetch(infoUrl, fetchInit)
      .then(res => res.json())
      .then(res => {
        const { data } = res

        switch (res.code) {
        case 0:
          setLocalStorage(userInfoKey, data)

          if (data.jwtToken) {
            setLocalStorage(jwtTokenKey, data.jwtToken)

            setLocalStorage(name, data.name) // 用户名
            setLocalStorage(cname, data.cname) // 中文名
            if (getLocalStorage(jwtTokenKey)) {
              location.reload()
            }
          }

          if (data.menu) {
            setLocalStorage(menuInfoKey, data.menu)
          }
          resolve()
          break
        case 605:
          this.redirectLogin()
          break
        case -1:
          console.error('请求失败', res.msg)
          break
        }

        return res
      })
      .catch((err) => {
        console.error('请求失败', err)
      })
  }
  validateToken(callback) {
    const { serverHost } = this

    const {
      jwtTokenKey,
      serverValidate
    } = this.config

    const fetchInit = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/jsoncharset=utf-8',
        'Authorization': `Bearer ${!!window.localStorage['JWT_TOKEN'] ? JSON.parse(window.localStorage['JWT_TOKEN']) : ''}`
      }
    }

    const validateUrl = serverHost + serverValidate

    fetch(validateUrl, fetchInit)
      .then(res => res.json())
      .then(res => {
        switch (res.code) {
        case 0:
          callback && callback()
          break
        case 600:
          this.logout()
          break
        case -1:
          console.error('请求失败', res.msg)
          break
        default:
          this.logout()
        }

        return res
      })
      .catch((err) => {
        console.error('请求失败', err)
      })
  }

  /**
   * 退出登录
   */
  logout() {
    const { serverHost, serverEnv } = this
    // console.log(serverHost, " serverhost")
    const {
      appId,
      serverLogout,
      jwtTokenKey,
      devLogin
    } = this.config

    const logoutUrl = serverHost + serverLogout

    setLocalStorage(jwtTokenKey, '')
    location.assign(logoutUrl)
  }

  getUserInfo() {
    const { userInfoKey } = this.config
    const userInfo = getLocalStorage(userInfoKey)

    return userInfo
  }
}
