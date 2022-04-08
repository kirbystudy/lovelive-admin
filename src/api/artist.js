import { get, post, put } from './request.js'

// 获取所有歌手
export const list = () => {
  return get('/artists')
}

// 创建歌手
export const create = artist => {
  return post('/artists', artist)
}

// 更新歌手
export const update = (id, fields) => {
  return put(`/artists/${id}`, fields)
}
