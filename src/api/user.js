import { get } from './request'

// 分页查询
export const search = page => {
  return get('/users', { params: page })
}

// 获取当前用户信息
export const getCurrentUser = () => {
  return get('users/myLoginState')
}
