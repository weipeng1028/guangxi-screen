let dynamicConfig = {
  server_url: 'http://39.101.190.24/bigscreen'
  // 自行加配置项
}
let jsonStr = JSON.stringify(dynamicConfig)
localStorage.dynamicConfig = jsonStr
// let dynamicConfig.server_url = 'http://39.101.190.24'
// 开发环境使用js中定义的配置，生产环境使用config/dynamicConfig.js中配置
if (process.env.NODE_ENV === 'developement') {
  dynamicConfig.server_url = 'http://127.0.0.1:8888' // 自定义
} else {
  if (localStorage.dynamicConfig) { // 使用从dist/config/dynamicConfig.js中读取的配置
    let config = JSON.parse(localStorage.dynamicConfig)

    if (config.server_url) dynamicConfig.server_url = config.server_url
  }
}
