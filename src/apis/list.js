/**
 * 获取列表
 * @param {入参} params
 */
export const getItemList = (params = {}) => {
  // mock 场景
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


  return new Promise((resolve, reject) => {
    resolve(data)
  })

  // 实际场景
  return Client.query(`{
    
  }`).then(data => data)
}

/**
 * 新增
 * @param {入参} params
 */
export const addItem = (params = {}) => {
  // mock 场景
  return new Promise((resolve, reject) => {
    resolve(true)
  })

  // 实际场景
  return Client.mutate(`{
    
  }`).then(data => data)

}

/**
 * 删除
 * @param {入参} params 
 */
export const deleteItem = (params = {}) => {
  // mock 场景
  return new Promise((resolve, reject) => {
    resolve(true)
  })

  // 实际场景
  return Client.mutate(`{
    
  }`).then(data => data)
}


/**
 * 更新
 * @param {入参} params
 */
export const updateItem = (params = {}) => {
  // mock 场景
  return new Promise((resolve, reject) => {
    resolve(true)
  })

  // 实际场景
  return Client.mutate(`{
    
  }`).then(data => data)
}