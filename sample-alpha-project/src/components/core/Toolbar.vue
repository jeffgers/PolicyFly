<template>
  <v-toolbar app>
    <v-toolbar-title class="headline">
      <span>Vuetify Repo</span>
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      @click="requestLogin"
      v-text="'GitHub Login'"
    />
    <v-toolbar-title>
      <span class="subheading font-weight-light">Requests Remaining: {{ remaining }}</span>
    </v-toolbar-title>
    <v-toolbar-title>
      <span class="subheading font-weight-light">Rate limit resets at: {{ resetOn }}</span>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Toolbar',
  data () {
    return {
      remaining: 60, // default for unauthenticated requests
      resetOn: undefined,
      intervalId: 0,
    }
  },
  created () {
    this.getLimitInfo()
    this.intervalId = setInterval(this.getLimitInfo, 30000)
  },

  destroyed () {
    clearInterval(this.intervalId)
  },

  methods: {
    async getLimitInfo () {
      const previous = this.remaining
      const { data } = await this.$http.get('https://api.github.com/rate_limit')
      this.remaining = data.resources.core.remaining
      // reset time is given in seconds, convert to ms to pass to Date obj
      this.resetOn = new Date(data.resources.core.reset * 1000).toLocaleString()
      if (this.remaining === 0 && previous !== 0) {
        this.$snackbar.error('Rate limit is reached. Try again after reset.')
      }
    },
    async requestLogin () {
      const code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      localStorage.setItem('code', code)

      try {
        window.open(`https://github.com/login/oauth/authorize?client_id=${process.env.VUE_APP_CLIENT_ID}&redirect_uri=http://localhost:8080/auth&state${code}`, '_self')
      } catch (err) {
        console.log(err.response)
      }
    },
  },
}
</script>
