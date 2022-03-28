import axios from 'axios'
import store from '../store'
import notify from '../utils/notify.js'

const baseUrl = import.meta.env.VITE_API_HOST
const tokenPrefix = 'Bearer '

const instance = axios.create({
  baseURL: baseUrl
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做一些事情
    // 第一次登录的时候是没有token的，等登录完成后才可以获取到token,然后在请求其他接口的时候就会带上token,表示已经登录状态
    if (store.state.user.token) {
      // 让每个请求携带token
      // ['Authorization'] 是自定义标题键
      // 请根据实际情况修改
      config.headers['Authorization'] = tokenPrefix + store.state.user.token
    }
    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // 用于调试
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    if (response.data.code) {
      handleErrorResponse(response)
      return Promise.reject(response.data)
    }
    return response.data
  },
  error => {
    if (!error.response) {
      notify.error('请求不成功，请联系后台管理员')
    }
    handleErrorResponse(error.response)
    return Promise.reject(error)
  }
)

const handleErrorResponse = response => {
  if (response.status === 401 || response.status === 403) {
    store.dispatch('user/logout').then(() => {
      window.location.reload()
    })
  }

  if (response.data instanceof Array) {
    response.data.forEach(item => {
      notify.error(item.message)
    })
  } else {
    notify.error(response.data.message)
  }
}

const { get, post, put } = instance

export { get, post, put }
