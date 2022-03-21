import axios from 'axios'
import store from '../store'
import { getToken } from '../utils/auth.js'

const baseUrl = import.meta.env.VITE_API_HOST

const instance = axios.create({
  baseURL: baseUrl
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做一些事情
    console.log(store.state.user.token)
    if (store.state.user.token) {
      // 让每个请求携带token
      // ['Authorization'] 是自定义标题键
      // 请根据实际情况修改
      config.headers['Authorization'] = store.state.user.token
    }
    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // 用于调试
    return Promise.reject(error)
  }
)

const { get, post, put } = instance

export { get, post, put }
