const Core = require('@alicloud/pop-core')
const chalk = require('chalk')
const currentEnv = require('../utils/getEnv')()
let cdnUrl = require(`../config/${currentEnv}.env`).CDN_URL
let prefix = require(`../config/${currentEnv}.env`).PREFIX
let flowConfig = require(`./flow.config`)

var client = new Core({
  accessKeyId: flowConfig.ACCESSKEY_ID,
  accessKeySecret: flowConfig.ACCESSKEY_SECRET,
  endpoint: 'https://cdn.a./flow.config',
  apiVersion: '2018-05-10',
})
console.log(`🦄 ${chalk.yellow.bold('刷新路径为' + cdnUrl + `/${prefix}/`)}`)
var params = {
  ObjectPath: cdnUrl + `/${prefix}/`,
  ObjectType: 'Directory',
}

var requestOption = {
  method: 'POST',
  formatParams: false,
}

client.request('RefreshObjectCaches', params, requestOption).then(
  (result) => {
    console.log(JSON.stringify(result))
  },
  (ex) => {
    console.log(ex)
  }
)
