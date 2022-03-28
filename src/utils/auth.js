import Cookies from 'js-cookie'

const TokenKey = 'lovelive-music'

const UserKey = 'current-user'

const defaultUser = {
  username: null,
  nickname: null,
  roles: []
}

export const getToken = () => {
  return Cookies.get(TokenKey)
}

export const setToken = token => {
  return Cookies.set(TokenKey, token)
}

export const removeToken = () => {
  return Cookies.remove(TokenKey)
}

export const getCurrentUser = () => {
  const user = Cookies.get(UserKey)
  return user === undefined ? defaultUser : JSON.parse(user) // 转换成对象
}

export const setCurrentUser = currentUser => {
  return Cookies.set(UserKey, JSON.stringify(currentUser)) // 转换字符串
}

export const removeCurrentUser = () => {
  return Cookies.remove(UserKey)
}
