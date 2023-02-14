module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
    requireConfigFile: false,
    parser: '@babel/eslint-parser',
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-async-promise-executor': 0,
    'no-unused-vars': 'warn',
    'no-useless-escape': 'off',
    'vue/multi-word-component-names': 'off',
    // endOfLine: 0,
  },
}
