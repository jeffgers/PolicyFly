<template>
  <v-container>
    <app-commit-card :sha="$route.params.hash" />
  </v-container>
</template>

<script>

export default {
  name: 'CommitDetails',
}
</script>
