# vue3-web-template-management-platform

## 一、技术栈及工具库

- [Vite](https://cn.vitejs.dev/)（项目基础构建，自定义补充构建配置在文件 vite.config.js 中实现）
- [Vue3](https://www.javascriptc.com/vue3js/)（基础框架）
- [Vue Router4.x](https://router.vuejs.org/zh/index.html)（路由管理）
- [Pinia](https://pinia.web3doc.top/)（数据状态管理）
- [axios](https://github.com/axios/axios)（HTTP 接口请求处理）
- [scss](https://github.com/sass/node-sass)（CSS 扩展语言）
- [Element-Plus](https://element-plus.gitee.io/zh-CN/)（PC 端 UI 组件库）
- [mapbox](http://www.mapbox.cn/mapbox-gl-js/api/)（图斑展示及过滤）
- [dayjs](https://github.com/iamkun/dayjs)（轻量级时间处理库）
- [js-cookie](https://github.com/js-cookie/js-cookie)（轻量级的 cookies 处理库）
- [mapbox-gl-draw](http://www.mapbox.cn/mapbox-gl-js/example/mapbox-gl-draw/)（mapbox 绘图工具）
<!-- - [Turf.js](http://turfjs.org/)（地理空间分析库 - 处理各种地图算法） -->

## 二、项目开发

#### 注意: Node.js 版本基于 14.X.X

#### 1、克隆代码

```
git@codeup.aliyun.com:61b7f112a9dfa18f9b46af9b/web-template-management-platform.git
```

#### 2、安装依赖

```
npm install
```

#### 3、本地开发

##### 运行测试环境接口

```
npm run dev
```

##### 运行线上环境接口

```
npm run dev:prod
```

## 三、开发规范

#### 1、代码规范

项目采用 Vue 单文件组件模式开发，建议参考 [Vue 风格指南](https://www.javascriptc.com/vue3js/style-guide/)。同时，还应遵守以下命名规范:

- 文件夹命名采用小驼峰写法（CamelCase）
- Vue 组件命名采用大驼峰写法（PascalCase）
- js/css 文件命名采用小驼峰写法（CamelCase）
- 组件引入/组件注册/模板中使用组件均采用大驼峰写法（PascalCase）

#### 2、代码格式化检测及 git 提交规范

使用 [lint-staged](https://github.com/okonet/lint-staged#configuration)，配合 git hooks 工具 [husky](https://github.com/typicode/husky)，在 git commit 之前自动对当前位于 git 暂存区中未提交的代码进行语法/格式检查，渐进性地进行代码规范化处理，避免对项目中其它代码产生影响。

- 代码格式化工具： [Prettier](https://prettier.io/docs/en/index.html)
- 代码规则检测工具： [Eslint](https://github.com/eslint/eslint)
- git 提交规范： [Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
- git 钩子管理工具： [Husky](https://github.com/typicode/husky)
- git 暂存区的代码检测工具： [lint-staged](https://github.com/okonet/lint-staged)
- git 日志校验工具： [Commitlint](https://github.com/conventional-changelog/commitlint)

## 四、项目结构

```
│  .editorconfig                      编辑器配置
│  .env.development                   开发全局变量配置
│  .env.production                    生产全局变量配置
│  .eslintignore                      eslint规则检测忽略的文件配置
│  .eslintrc.cjs                      eslint校验规则配置
│  .gitignore                         git提交忽略的文件配置
│  .prettierignore                    prettier规则检测忽略的文件配置
│  .prettierrc.cjs                    prettier校验规则配置
│  babel.config.cjs                   babel配置
│  commitlint.config.js               git提交规范配置
│  index.html                         项目入口html文件
│  package.json                       项目配置
│  README.md                          项目说明
│  vite.config.js                     项目配置
├─public
│      favicon.ico                    项目图标
│      mapbox-gl.css                  mapbox样式文件
│
├─src
│  │  App.vue                         项目根组件
│  │  main.js                         入口文件
│  ├─assets                           静态资源文件目录（字体/图片等）
│  ├─components                       全局公用组件目录
│  ├─fetch                            HTTP接口请求相关封装目录
│  ├─layout                           公共页面布局目录
│  ├─router                           路由配置目录
│  ├─stores                           全局状态存储目录
│  ├─styles                           全局样式文件目录
│  ├─utils                            全局工具函数目录
│  └─views                            业务页面文件存放目录
│      ├─jurisdiction                 权限申请
│      ├─perceptualData               感知数据管理
│      ├─pinia                        Pinia示例
│      ├─userManage                   用户管理
│      └─vEcharts                     vue-echarts示例
└─utils                               全局打包工具函数目录

```

## 五、重要功能/技术点说明

## 六、线上部署

#### 1、本地打包

- 打包测试环境接口 `npm run build:dev`
- 打包正式环境接口 `npm run build:prod`

<!-- #### 2、将打包后的代码上传至阿里云账号[领见数字农业](https://shimowendang.com/docs/VMAPV50rxLfZ2xqg)下 oss 空间

- certifarm-web（正式环境）
- certifarm-web-test（测试环境） -->

<!-- #### 3、配置回源策略

登录阿里云账号[领见数字农业](https://shimowendang.com/docs/VMAPV50rxLfZ2xqg)，配置访问回源策略，避免页面刷新时 404 的问题。

- 线上环境：[https://oss.console.aliyun.com/bucket/oss-cn-hangzhou/certifarm-web/settings/retrieving](https://oss.console.aliyun.com/bucket/oss-cn-hangzhou/certifarm-h5/settings/retrieving)
- 测试环境：[https://oss.console.aliyun.com/bucket/oss-cn-hangzhou/certifarm-web-test/settings/retrieving](https://oss.console.aliyun.com/bucket/oss-cn-hangzhou/certifarm-h5-test/settings/retrieving) -->
<!--
#### 4、访问地址

- 测试环境访问地址： http://test-web.certifarm.cn/webLinanAIAnalysisPlatform/satelliteData?token=06206F19098D9A3CC81AE78CFF7BB3BF
- 正式环境访问地址： https://web.certifarm.cn/webLinanAIAnalysisPlatform/satelliteData?token=06206F19098D9A3CC81AE78CFF7BB3BF -->

## 七、注意事项

- 左侧导航栏字体图标托管在 [iconfont+](https://at.alicdn.com/t/project/2607467/0f013d96-b9c4-4446-a4b9-6e5be62c169e.html?spm=a313x.7781069.1998910419.62) 上，通过 Font class 方式引用。
