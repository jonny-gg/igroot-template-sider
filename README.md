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
    }
  }
}
```

### 目录结构
```
src
  |-- components           # iGroot 业务组件
  |-- pages                # 页面（应用的主体内容，pages 下的每一个文件夹代表一个单页）
  |-- static               # 静态资源（存放图片、字体等静态文件）
  |-- util                   # 通用工具方法
      |-- function.js       # 通用的函数
```

### API 使用说明

``` javascript
// 针对restful 的使用方式

import igrootFetch from 'igroot-fetch'
import domain from '@/util/domain'

igrootFetch(domain+'/aa/bb/cc').get().then((res)=>{console.log(res,'返回结果')})
igrootFetch(domain+'/aa/bb/cc').post(postBody).then((res)=>{console.log(res,'返回结果')})
//等等等....

```

`graphql`类型的 API：

``` javascript
/**
 * @desc 分为query mutate两个调用方法
 * @desc query 对应graphql的查询
 * @desc mutate 对应graphql的编辑
 */
  //例如
  //查询调用方式:
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

  // 修改/删除调用方式
Client.mutate(`
  {
    userUpdate(id:"1",name:"test2")
  }
`)

```
