import axios from 'axios'

class Api {
  constructor () {
    this.client = axios.create({
      baseURL: process.env.VUE_APP_HTTP_BASE,
    })
  }

  fetchCommits (options, page = 1, limit = 10) {
    let url = `/commits?sort=created&page=${page}&per_page=${limit}`
    if (options.sha) url = `${url}&sha=${options.sha}`
    if (options.author) url = `${url}&author=${options.author}`
    return this.client.get(url)
  }

  fetchCommit (sha) {
    return this.client.get(`/commits/${sha}`)
  }

  fetchContributors () {
    return this.client.get(`/contributors`)
  }

  fetchUser (username) {
    return this.client.get(`/users/${username}`)
  }
}

export default new Api()
