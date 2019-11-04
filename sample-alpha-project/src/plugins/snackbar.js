import Vue from 'vue'

Vue.mixin({
  computed: {
    $snackbar () {
      return {
        default: (m, t, c) => this.$message('', m, t, c),
        error: (m, t, c) => this.$message('error', m, t, c),
        info: (m, t, c) => this.$message('info', m, t, c),
        success: (m, t, c) => this.$message('success', m, t, c),
        warning: (m, t, c) => this.$message('warning', m, t, c),
      }
    },
  },

  methods: {
    $message (type, msg, timeout = 6000, close = false) {
      this.$store.commit('app/setSnackbar', {
        type,
        msg,
        timeout,
        close,
      })
    },
  },
})
