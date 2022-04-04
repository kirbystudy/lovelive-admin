import { get, post } from './request'

// 用户检索
export const search = page => {
  return get('/users', { params: page })
}

// 获取当前用户信息
export const getUser = () => {
  return get('/users/myLoginState')
}

// 用户注册
export const create = user => {
  return post('/users', user)
}
