# fe-Template Project

> 这个是基于iGroot 组件库构建的新项目

## Warning
> 请先执行 npm install 安装依赖包


该项目是由`sl-core`生成的，因此，项目的调试与构建都需要依赖于它

``` bash
############################################################
# warning: The following commands need to install the 'sl-core' #
############################################################

# serve with hot reload at localhost:8080
sl dev

# build for production with minification
sl build

# check and fix project(auto fix to fixable problame )
sl lint
```

### bsy.json
这是你的项目配置文件，其中有一些非常重要的配置内容。下面是对各项配置内容的介绍：
``` javascript
{
  "name": "",                   // 项目名称
  "type": "project",            // 项目类型
  "builder": "igroot-builder",  // 项目构建器

  "options": {                  // 项目配置
    "homepage": "home",         // 开发环境首页映射
    "domain": "localhost",  // 开发服务器域名（非 localhost 可能需要修改系统 hosts 文件）
    "port": 8080,               // 开发端口
    "lint": true,               // 是否在 dev 与 build 阶段启用 eslint 来检查代码
    "theme": {          // 自定义主题，详细配置参数请查看 iGroot 官网下的主题一栏
      "primary-color": "#1DA57A"
    },

    // 开发环境全局变量
    "dev": {
      // defalut.apiDomail 为默认的 API 请求地址，必须不为空，测试与生产环境下相同
      "default": {"apiDomain": "http://localhost:8080"},

      // 若是在项目中拥有不同的 API 配置，如：端口不同、域名不同，则需要配置额外的变量分组
      "example": {"apiDomain": "http://localhost:8080"},

      // 其余字段可自行扩展，在项目中直接通过 APP_CONFIG 引用，如：
      "key": "value"

      // 上述字段内容在项目中可直接通过 APP_CONFIG.key 获取，测试与生产环境全局变量使用方法相同
    },

    // 测试环境全局变量
    "test": {
      "default": {"apiDomail": "http"}
    },

    // 生产环境全局变量
    "prod": {
      "default": {"apiDomain": "http://localhost:8080"}
    }
  }
}
```

### 目录结构
```
src
  |-- apis                 # API 层
      |-- api.js           # API 声明（所有API声明都在该文件中完成）
      |-- index.js         # 向外提供的 API 调用（外部调用的 API 实例通过该文件获取，开发人员无需关心该文件内容）
      |-- extend           # API 扩展文件夹（API 扩展相关内容请参考API扩展小结）
          |-- ....
  |-- components           # iGroot 业务组件
  |-- pages                # 页面（应用的主体内容，pages 下的每一个文件夹代表一个单页）
  |-- static               # 静态资源（存放图片、字体等静态文件）
  |-- util                   # 通用工具方法
      |-- api.js            # API 对象的基础类
      |-- function.js       # 通用的函数
      |-- http_request.js   # http请求的基础封装库
      |-- transport.js      # GraphQL请求的http层
```

### API 使用说明
项目模板中已内置了封装好的 API 实例，可直接引用
``` javascript
import { Api, Client } from '@@'
```
`@@`是路径`/src/apis/index.js`的别名，其中的`Api`是`RESTful`类型 API 的封装，`Client`是`GraphQL`类型的封装。

`Client`调用方式:
``` javascript
/**
 * @desc 分为query mutate两个调用方法
 * @desc query 对应graphql的查询
 * @desc mutate 对应graphql的编辑
 */
例如
  查询调用方式:
Client.query(`
  {
    user{
      name,
      id
    }
  }
`).then((data)=>{
  console.log(data,'balabala')
})
  修改/删除调用方式
Client.mutate(` 
  {
    userUpdate(id:"1",name:"test2")
  }
`)

```

`RESTful`类型的 API 封装方法有：
``` javascript
/**
 * @desc 对应 HTTP 的四种请求：GET/POST/PUT/DELETE
 * @param {object}  data          请求要发送的参数，get 请求会挂载在 url 中，其余类型会挂载在请求体中
 * @param {boolean} [showMessage] 请求成功后是否显示请求成功弹窗，默认为 true
 * @param {object}  [headers]     自定义 HTTP 头部信息
 * @param {object}  [fetchObj]    自定义 fetch 配置，如果配置了 headers，则会覆盖前一个参数配置的 headers
 * @return {Promise[json]}  {code: 0, }
 */
Api[yourAPI].get(data, headers, fetchObj)
Api[yourAPI].post(data, showMessage, headers, fetchObj)
Api[yourAPI].put(data, showMessage, headers, fetchObj)
Api[yourAPI].delete(data, showMessage, headers, fetchObj)
```

`GraphQL`类型的 API 是基于 `lokka` 来封装的，使用说明详见 [lokka](https://github.com/kadirahq/lokka)。此外，在使用时，还可以在`/src/apis/api.js`中配置一些额外的内容：
``` javascript
{
  url: '',  // 如右侧所示：http://xxx.com/[url]
  options: {
    group: '',                            // 全局变量分组，默认为 default
    handleHttpErrors(response) {},        // 自定义 HTTP 错误处理函数
    handleGraphQLErrors(errors, data) {}, // 自定义 GraphQL 错误处理函数
    handleSuccess() {}                    // 自定义 GraphQL 成功处理函数(仅 mutation 会触发)
  }
}
```

> 对于使用者来说，只需要关注`/src/apis/api.js`文件的内容即可。详细示例请查看初始项目生成内容。

#### 关于 API 扩展(extend)的使用说明
> 注：extend 仅针对 RESTful 使用，GraphQL 请略过

##### 使用场景
在我们编写前端代码，调用 API 向后端获取数据时，可能会由于各种各样的原因，导致 **API 所提供的服务无法符合一个统一的标准**，例如这几个场景：
* 由于历史原因，后端提供给我们的 API 可能并不符合 RESTful 规范，例如：
  * 增：POST /someroute/add
  * 改：PUT /someroute/update
  * 查：PUT /someroute

* 对同一资源的单复数操作致使数据格式或 API 不同，例如：
  * 添加单条数据：POST /someroute         {id:xx, data:{/\*some thing...\*/}}
  * 添加多条数据：POST /someroute/more    [{id:xx, data:{/\*some thing...\*/}},{id:xx, data:{/\*some thing...\*/}}]

* 不同 API 之间获取到的数据格式不统一，例如：
  * 获取 A 资源：GET /someroute/a response: 123
  * 获取 B 资源：GET /someroute/b response: {data: {id: 123}}

* ……

不同 API 之间的差异，若是放到业务代码中来处理，就会使得各个业务模块在 API 的调用与处理上存在差异化，十分不利于后期的维护。
因此，框架中抽离出了 API 层来专门处理不同 API 之间的差异，使其在业务层面的调用能够拥有一致的体验。

##### 使用方法
所有 API 存放在 `/src/apis/api.js` 中，其中，API 的基础类提供了部分通用的请求类型，但在上一节描述的场景下，还不能够彻底的满足需求。因此需要**使用 extend 来扩展处理内容，而不是将这段处理逻辑与业务代码耦合**。扩展的使用示例请查看初始化项目中的`/src/apis/api.js`

**总而言之，隔离出 API 层的目的是使其承担`接口转化`与`数据格式转化`的功能，使得业务层调用的 API 与获得的数据能够统一，而扩展的使用，就是实现这个目的的手段。**