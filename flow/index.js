const axios = require('axios')
const currentEnv = require('../utils/getEnv')()
// https://open.feishu.cn/open-apis/bot/v2/hook/ac773169-9e8e-4553-b979-9bd91321c03d

const OSS = require('ali-oss')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

let BUCKET = require(`../config/${currentEnv}.env`).BUCKET
let PREFIX = require(`../config/${currentEnv}.env`).PREFIX
let cdnUrl = require(`../config/${currentEnv}.env`).CDN_URL
let flowConfig = require(`./flow.config`)

const client = new OSS({
  // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: 'oss-cn-hangzhou',
  // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
  accessKeyId: flowConfig.ACCESSKEY_ID,
  accessKeySecret: flowConfig.ACCESSKEY_SECRET,
  bucket: BUCKET,
})

// 获取dist文件的绝对路径
const root = path.resolve(__dirname, '../dist')
const files = []
// 通过fs获取dist目录下的所有文件
function readDirSync(p) {
  const pa = fs.readdirSync(p)
  pa.forEach((e) => {
    const cur_path = `${p}/${e}`
    const info = fs.statSync(cur_path)
    if (info.isDirectory()) {
      readDirSync(cur_path)
    } else {
      files.push(cur_path)
    }
  })
}
readDirSync(root)
console.log(
  files.map((v) => {
    const name = v.replace(root, '')
    return name
  })
)

// 上传文件
async function put(name, file) {
  try {
    await client.put(name, file)
  } catch (error) {
    error.failObjectName = name
    return error
  }
}
// 循环files数组，上传文件
async function upload() {
  const result = await Promise.all(
    files.map((v) => {
      // 获取文件名 dist之后的路径
      const name = v.replace(root, '')
      console.log(name)
      return put(`${PREFIX}${name}`, v)
    })
  )
}
// 处理请求失败的情况，防止promise.all中断，并返回失败原因和失败文件名。
async function handleDel(name, options) {
  try {
    await client.delete(name)
  } catch (error) {
    error.failObjectName = name
    return error
  }
}
// 删除多个文件。
async function deletePrefix(prefix) {
  // 前缀prefix的值为空字符串或者NULL，将会删除整个Bucket内的所有文件，慎用。
  if (!prefix) {
    throw new Error('prefix is required')
  }
  const list = await client.list({
    prefix: prefix,
  })

  list.objects = list.objects || []
  const result = await Promise.all(list.objects.map((v) => handleDel(v.name)))
  console.log(result)
  await upload()
  console.log(`🦄 ${chalk.yellow.bold('部署成功' + BUCKET + prefix)}`)
  if (flowConfig.ROBOT_MSG) sendMessage()
}

async function sendMessage() {
  const { name, ctx, url } = flowConfig.MSG_CONTENT
  let content = [
    [
      { tag: 'text', text: '项目名称: ' },
      { tag: 'text', text: name },
    ],
    [
      { tag: 'text', text: '当前环境: ' },
      { tag: 'text', text: `${currentEnv === 'dev' ? '测试' : '正式'}环境` },
    ],
    [
      { tag: 'text', text: '运行状态: ' },
      { tag: 'text', text: '✅运行成功' },
    ],
    [
      { tag: 'text', text: '本次更新内容: ' },
      { tag: 'text', text: ctx },
    ],
    [
      { tag: 'text', text: '访问地址: ' },
      { tag: 'a', text: url, href: url },
    ],
  ]
  if (!ctx) content.splice(3, 1)
  axios({
    method: 'post',
    url: flowConfig.MSG_URL,
    data: {
      msg_type: 'post',
      content: JSON.stringify({
        post: {
          zh_cn: {
            title: '前端页面部署通知',
            content: content,
          },
        },
      }),
    },
  }).then((res) => {
    console.log(true)
  })
}

// 如果您需要删除所有前缀为src的文件，则prefix设置为src。设置为src后，所有前缀为src的非目录文件、src目录以及目录下的所有文件均会被删除。
deletePrefix(PREFIX)
