import { get } from './request.js'

// 获取站点配置信息
export const getSiteConfig = () => {
  return get('/site/config')
}
