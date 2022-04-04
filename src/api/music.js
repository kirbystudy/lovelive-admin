import { get, post, put } from './request.js'

// 查询所有歌曲
export const list = () => {
  return get('/musics')
}

// 新增歌曲
export const create = music => {
  return post('/musics', music)
}

// 更新歌曲
export const update = (id, music) => {
  return put(`/musics/${id}`, music)
}

// 上架歌曲
export const publish = id => {
  return post(`/musics/${id}/publish`)
}

// 下架歌曲
export const close = id => {
  return post(`/musics/${id}/close`)
}
