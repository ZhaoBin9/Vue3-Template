import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteLegacy from '@vitejs/plugin-legacy'
import viteCompression from 'vite-plugin-compression'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import eslintPlugin from 'vite-plugin-eslint'
import getEnv from './utils/getEnv'

const currentEnv = getEnv()

export default defineConfig(async () => {
  const envConfig = await import(`./config/${currentEnv}.env.js`)
  return {
    plugins: [
      vue(),
      vueJsx(),
      vueSetupExtend(),
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
        // lintOnStart: false,
        // emitWarning: false,
        // emitError: false,
      }),
      Components({
        dirs: ['src/components'], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
        resolvers: [ElementPlusResolver()],
      }),
      viteLegacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
      viteCompression({
        // 打包文件gzip压缩
        threshold: 1024000, // 对大于 1mb 的文件进行压缩
      }),
    ],
    define: {
      'process.env': {
        npm_config_env: currentEnv,
        envConfig: envConfig,
      },
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
      },
      extensions: ['.js', '.vue'],
    },
    server: {
      host: 'localhost',
      port: '8080',
      open: true,
      hmr: {
        // overlay: false,
      },
      proxy: {
        '/foo': 'http://localhost:4567',
        // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        // 正则表达式写法：http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
        '^/fallback/.*': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/fallback/, ''),
        },
      },
    },
    build: {
      target: 'es2015',
    },
  }
})
