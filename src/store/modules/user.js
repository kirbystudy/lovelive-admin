import {
  getToken,
  removeToken,
  getCurrentUser,
  setCurrentUser,
  setToken,
  removeCurrentUser
} from '../../utils/auth.js'
import { createToken } from '../../api/token.js'
import { getUser } from '../../api/user.js'

const state = () => ({
  token: getToken(),
  currentUser: getCurrentUser()
})

const getters = {
  nicknameFirstWord: state => {
    return state.currentUser && state.currentUser.nickname
      ? state.currentUser.nickname.slice(0, 1)
      : ''
  }
}

const actions = {
  login({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      createToken(username.trim(), password)
        .then(token => {
          commit('SET_TOKEN', token)
          setToken(token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  logout({ commit }) {
    commit('SET_TOKEN', '')
    commit('SET_CURRENT_USER', '')
    removeToken()
    removeCurrentUser()
  },

  fetchCurrentUser({ commit }) {
    return new Promise((resolve, reject) => {
      getUser()
        .then(currentUser => {
          commit('SET_CURRENT_USER', currentUser)
          setCurrentUser(currentUser)
          resolve(currentUser)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_CURRENT_USER: (state, currentUser) => {
    state.currentUser = currentUser
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
