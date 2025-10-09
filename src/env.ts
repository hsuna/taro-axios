import Taro from '@tarojs/taro'

export const isWebLikeEnv = [Taro.ENV_TYPE.WEB, Taro.ENV_TYPE.RN].includes(
  Taro.getEnv() as typeof Taro.ENV_TYPE.WEB | typeof Taro.ENV_TYPE.RN,
)
