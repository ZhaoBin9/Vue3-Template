

const currentEnv = require('../utils/getEnv')()
let cdnUrl = require(`../config/${currentEnv}.env`).CDN_URL

module.exports = {
  ROBOT_MSG: false,
  MSG_URL: 'https://open.feishu.cn/open-apis/bot/v2/hook/564aa555-75b5-4660-bc64-9c0a0629a597',
  MSG_CONTENT: {
    name: '浙江省水土保持数字化管理应用', // 项目名称
    url: `${cdnUrl}/webZhejiangWaterManagementSystem/`, // 项目地址
    ctx: '\n1、监测评价-突发任务修改为突发报告\n2、在项目审批模块中点击编辑取消按钮，未返回到列表页', // 本次更新内容
  },
}
