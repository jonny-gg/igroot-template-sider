import { notification, message } from 'igroot'
import { logout, getJwtToken } from '@/util/sso'

export default class BaseIO {
  constructor() {
    this.baseConfig = {
      credentials: false,
      mode: 'cors',
      needType: false,
    }
    this.authorization = `Bearar ${getJwtToken()}`
  }

  handleErrors = ({errors,msg}) => {
    if(errors) {
      message.error(`${msg}：${errors[0].message}`)
    }else {
      message.error(msg)
    }
  }

  handleHttpErrors = (response) => {
    response
      .json()
      .then(res => {
        if (res.code === 1001) {
          logout()
        } else {
          notification.error({message: 'HTTP请求错误', description: `${response.status}: ${response.statusText}`})
        }
      })
  }
}