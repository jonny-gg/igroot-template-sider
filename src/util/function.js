/**
 * 该模块主要用于放常用的函数集合
 * 后续可以集成在 igroot-util
 */
import React, { Component } from 'react'
import { domainList } from '@/config/domain'

/**
 * 获取后端服务主域
 */
function getDomain() {
  const host = window.location.host
  let domain = ''

  domainList.map(item => {
    if (item.host.test(host)) domain = item.domain
  })

  // if (!domain)
  //   throw new Error('Can not match the domain! Please check your domain config.')
  return domain
}


/**
 * 高阶组件 传入定制化属性
 * @param {*} WrappedComponent 
 * @param {*} props 
 */
function componentHOC(WrappedComponent, props) {
  return class ExtendsComponent extends Component {
    render() {
      return <WrappedComponent {...this.props} {...props} />
    }
  }
}

/**
 * 获取本地存储数据
 * @param {String} key 
 */
function getStorageItem(key) {
  const value = window.localStorage && window.localStorage.getItem(key)

  return JSON.parse(value)
}

/**
 *  设置本地存储
 * @param {String} key 
 * @param {*} value 
 */
function setStorageItem(key, value) {
  const newVaule = JSON.stringify(value)

  return window.localStorage && window.localStorage.setItem(key, newVaule)
}



export {
  getDomain,
  componentHOC,
  getStorageItem,
  setStorageItem
}
