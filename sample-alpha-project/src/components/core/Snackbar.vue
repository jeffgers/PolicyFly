<template>
  <v-snackbar
    v-model="model"
    :color="snackbar.type"
    :timeout="snackbar.timeout"
    right
  >
    <v-icon
      :dark="snackbar.type !== 'warning'"
      v-text="icon"
    />
    <span
      :class="snackbar.type === 'warning' ? 'black--text' : 'white--text'"
      v-text="snackbar.msg"
    />
    <v-btn
      v-if="snackbar.close"
      class="ml-1"
      icon
      flat
      @click="model = false"
    >
      <v-icon
        :dark="snackbar.type !== 'warning'"
        small
        v-text="'mdi-close'"
      />
    </v-btn>
  </v-snackbar>
</template>

<script>
// Utilities
import {
  mapState,
} from 'vuex'

const ICON_MAP = {
  error: 'mdi-alert-octagon',
  info: 'mdi-information',
  success: 'mdi-check-circle',
  warning: 'mdi-alert-circle',
}

export default {
  data: () => ({
    model: false,
  }),

  computed: {
    ...mapState('app', ['snackbar']),
    icon () {
      return ICON_MAP[this.snackbar.type] || 'mdi-playlist-check'
    },
  },

  watch: {
    snackbar () {
      this.model = true
    },
  },
}
</script>
