<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
    width="200"
  >
    <v-list
      class="pt-0"
      dense
    >
      <v-divider />

      <v-list-tile
        v-for="item in items"
        :key="item.title"
        :to="item.to"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    items: [
      { title: 'Commits', icon: 'mdi-source-commit', to: '/commits' },
    ],
  }),
}
</script>

<style>

</style>
