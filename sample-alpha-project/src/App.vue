<template>
  <v-app>
    <core-toolbar />
    <core-drawer />
    <core-snackbar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  },
}
</script>
