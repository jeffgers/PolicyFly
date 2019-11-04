import api from '@/lib/api'

export default {
  async fetchCommits ({ commit }, payload = {}) {
    try {
      let params = {}
      if (payload.sha) params.sha = payload.sha
      if (payload.author) params.author = payload.author
      const { data } = await api.fetchCommits(params, payload.page, payload.limit)
      commit('setCommits', data)
    } catch (e) {
      console.error(`Error encountered fetching commits`, e)
    }
  },
  async fetchCommit ({ commit }, sha) {
    try {
      const { data } = await api.fetchCommit(sha)
      return data
    } catch (e) {
      console.error(`Error encountered fetching commits`, e)
    }
  },
  async fetchContributors ({ commit }) {
    try {
      const { data } = await api.fetchContributors()
      const users = data.map(user => ({
        id: user.id,
        contributions: user.contributions,
        login: user.login,
        avatar: user.avatar_url,
      }))
      commit('setContributors', users)
      return users
    } catch (e) {
      console.error(`Error encountered fetching contributors`, e)
    }
  },
}
