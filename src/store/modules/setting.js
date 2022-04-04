import { getCurrentUser, getToken } from '../../utils/auth.js'
import { getSiteConfig } from '../../api/setting.js'

const state = () => ({
  site: {
    bucket: null,
    region: null,
    storage: null
  }
})

const getters = {
  bucket: state => {
    return state.site.bucket
  },
  region: state => {
    return state.site.region
  }
}

const actions = {
  async fetchSiteConfig({ commit }) {
    getSiteConfig().then(siteConfig => {
      commit('SITE_CONFIG_FETCHED', siteConfig)
    })
  }
}

const mutations = {
  SITE_CONFIG_FETCHED: (state, siteConfig) => {
    state.site = siteConfig
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
