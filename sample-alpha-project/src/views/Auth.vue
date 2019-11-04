<template>
  <v-container>
    <span v-if="!token">Authenticating....</span>
    <span v-else>Authenticated</span>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Auth',
  computed: {
    ...mapState('app', ['token']),
  },
  mounted () {
    const { code } = this.$route.query
    if (code) this.login()
  },
  methods: {
    ...mapMutations('app', ['setToken']),
    async login () {
      const { code } = this.$route.query
      try {
        const { data } = await this.$http.post('https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token', {
          client_id: process.env.VUE_APP_CLIENT_ID,
          client_secret: process.env.VUE_APP_SECRET,
          redirect_uri: 'http://localhost:8080/',
          code,
          state: localStorage.getItem('code'),
        })
        const match = /access_token=([a-zA-Z0-9]+)&/.exec(data)
        let token
        if (match) token = match[1]
        if (token) this.$http.defaults.headers.common['Authorization'] = `token ${token}`
        this.setToken(token)
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>
