import { post } from './request'

// 获取token
export const createToken = (username, password) => {
  return post('/tokens', { username, password })
}
