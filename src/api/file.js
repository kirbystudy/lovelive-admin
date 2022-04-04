import { post } from './request.js'

// 初始化上传接口
export const initUpload = file => {
  return post('/files/upload_init', file)
}

// 完成上传接口
export const finishUpload = fileId => {
  return post(`/files/${fileId}/upload_finish`)
}
