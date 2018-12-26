/**
 * 获取列表
 * @param {入参} params
 */
export const querySupplierPage = (params = {}) => {
  console.log(params, '传入的参数')
  // mock 场景
  const data = [
    {
      'id': 1,
      'name': '名称1',
      'isp_id': 'dx',
      'status': '1000',
      'province_id': 'fj',
      'created_at': '2018-08-01',
      'updated_at': '2018-08-02',
    },
    {
      'id': 2,
      'name': '名称2',
      'isp_id': 'yd',
      'status': '1002',
      'province_id': 'gd',
      'created_at': '2018-08-01',
      'updated_at': '2018-08-02',
    },
    {
      'id': 3,
      'name': '名称3',
      'isp_id': 'lt',
      'status': '1000',
      'province_id': 'zj',
      'created_at': '2018-08-01',
      'updated_at': '2018-08-02',
    }
  ]
  // 模板模拟数据方式，真实环境请注释, 并打开下方graphql注释
  return new Promise((resolve, reject) => {
    resolve(data)
  })

  // graphql请求客户端 真实调试请开启
  // return Client.query(`
  // 此处填写graphql请求参数
  // `).then(data => data)
}

/**
 * 新增
 * @param {入参} params
 */
export const createSupplier = (params = {}) => {
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
export const deleteSupplier = (params = {}) => {
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
export const updateSupplier = (params = {}) => {
  // mock 场景
  return new Promise((resolve, reject) => {
    resolve(true)
  })

  // 实际场景
  return Client.mutate(`{
    
  }`).then(data => data)
}