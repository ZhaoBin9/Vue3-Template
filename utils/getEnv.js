export default () => {
  const npmConfigEnv = process.env.npm_config_env
  const nodeEnv = process.env.NODE_ENV || 'development'
  if (nodeEnv === 'development') {
    return npmConfigEnv || 'dev'
  } else if (nodeEnv === 'production') {
    return npmConfigEnv || 'prod'
  }
}
