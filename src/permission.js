import router from './router/index.js'
import { getToken } from './utils/auth.js'

const whitelist = ['/login', '/403', '/404']

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whitelist.indexOf(to.path) !== -1) {
      // 在免费登录白名单中，直接去
      next()
    } else {
      // 其他无权访问的页面被重定向到登录页面
      next(`/login?redirect=${to.path}`)
    }
  }
})
