import BsFetch from 'igroot-fetch'
import { getDomain, getStorageItem } from '@/util/function'

import BaseIO from '@/util/base'

const domain = getDomain()

export default class ListIO extends BaseIO {
  constructor(args) {
    super(args)

    const url = `${domain}/[模块名]/graphql/query`
    this.client = BsFetch(url, {
      ...this.baseConfig,
      Authorization: this.authorization,
      handleErrors: this.handleErrors,
      handleHttpErrors:this.handleHttpErrors
    })
  }
  
  /** 
   * 添加
  */
 add(params) {
  const mutate = `($value: String!, $comment: String!){
      separatorCreateMutation(value: $value, comment: $comment)
    }
  `

  return new Promise((resolve, reject) => {
    resolve(true)
  })
  // return this.client.mutate(mutate, params)
  // .then(({ code }) => (code === 0))
}

  /** 
   * 获取列表
   */
  getList(params) {
    const query = `
      query{
        separatorFuzzyQuery{
          id
          value
          comment
        }
      }
    `

    let data = [
      {
        "id": 1,
        "type": "a",
        "value": "xiugai1",
        "comment": "测试数据1"
      },
      {
        "id": 2,
        "type": "a",
        "value": "xiugai2",
        "comment": "测试数据2"
      },
      {
        "id": 3,
        "type": "a",
        "value": "xiugai3",
        "comment": "测试数据3"
      }
    ]

    if (params) {
      data = [
        {
          "id": 1,
          "type": "a",
          "value": "xiugai1",
          "comment": "测试数据1"
        }
      ]
    }

    

    return new Promise((resolve, reject) => {
      resolve(data)
    })
    // return this.client.query(query, params)
    //   .then(({ data }) => data.separatorFuzzyQuery)
  }

  /** 
   * 更新
  */
  update(params) {
    const mutate = `($id: Int!, $value: String!, $comment: String!){
      separatorModifyMutation(id: $id, value: $value, comment: $comment)
    }
    `
    return new Promise((resolve, reject) => {
      resolve(true)
    })
    // return this.client.mutate(mutate, params)
    // .then(({ code }) => (code === 0))
  }

  /** 
   * 删除
  */
 delete(id) {
  const mutate = `($id: Int!){
    separatorDeleteMutation(id: $id)
  }
  `

  return new Promise((resolve, reject) => {
    resolve(true)
  }) 
    // return this.client.mutate(mutate, params)
    // .then(({ code }) => (code === 0))
  }
  
}
