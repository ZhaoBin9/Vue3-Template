// 领见数农的RAM账号：
// 用户登录名称： liangqianyang@1375814065109231.onaliyun.com
// 登录密码： TNYya9yKVA$iy7ytJUiD$EwNf|0aB@8n
// AccessKey ID： LTAI5tAL4zdqi1NrN3raGzUk
// AccessKey Secret： Swztdnr5CE1tVrctCjQSGw5irQJPbg

// 领见数据RAM账号：
// 用户登录名称： liangqianyang@1329841139494868.onaliyun.com
// 登录密码： 4|h00&dLDiCuBrF%kJkJWsqmJP4v)YJs
// AccessKey ID： LTAI5tBaP1reYF4sRP8ysmnL
// AccessKey Secret： IxS8CYlpZpqfAI6vd71baXcbIcVw9n

// ROBOT_MSG（Boolean）：是否开启机器人服务
// MSG_URL：webhook地址推送地址
// MSG_CONTENT：发布内容
// 如不开启ROBOT_MSG，则不需要配置MSG_URL、MSG_CONTENT
// 飞书群 省水保-前端 webhook地址：
// https://open.feishu.cn/open-apis/bot/v2/hook/ac773169-9e8e-4553-b979-9bd91321c03d

const currentEnv = require('../utils/getEnv')()
let cdnUrl = require(`../config/${currentEnv}.env`).CDN_URL

module.exports = {
  ACCESSKEY_ID: 'LTAI5tBaP1reYF4sRP8ysmnL',
  ACCESSKEY_SECRET: 'IxS8CYlpZpqfAI6vd71baXcbIcVw9n',
  ROBOT_MSG: false,
  MSG_URL: 'https://open.feishu.cn/open-apis/bot/v2/hook/564aa555-75b5-4660-bc64-9c0a0629a597',
  MSG_CONTENT: {
    name: '浙江省水土保持数字化管理应用', // 项目名称
    url: `${cdnUrl}/webZhejiangWaterManagementSystem/`, // 项目地址
    ctx: '\n1、监测评价-突发任务修改为突发报告\n2、在项目审批模块中点击编辑取消按钮，未返回到列表页', // 本次更新内容
  },
}
