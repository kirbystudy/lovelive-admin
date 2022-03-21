import { getToken, removeToken, setToken } from '../../utils/auth.js'
import { login } from '../../api/user.js'

const state = () => ({
  nickname: '小埋',
  token: getToken(),
  username: '',
  roles: []
})

const getters = {
  nicknameFirstWord: state => {
    return state.nickname.slice(0, 1)
  }
}

const actions = {
  // 用户登录
  login({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      login(username.trim(), password)
        .then(res => {
          const authorization = res.headers['authorization']
          commit('SET_TOKEN', authorization)
          setToken(authorization)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 用户注销
  logout({ commit, state, dispatch }) {
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    removeToken()
  }
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
