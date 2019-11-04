<template>
  <v-card>
    <v-toolbar
      flat
      card
    >
      <v-toolbar-side-icon
        @click="goBack"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title v-text="`Commit ${sha}`" />
    </v-toolbar>
    <v-card-text>
      <v-layout
        row
        align-start
        justify-center
      >
        <template v-if="Object.keys(details).length">
          <v-flex
            xs6
            text-xs-center
          >
            <v-avatar size="128px">
              <v-img
                v-if="Object.keys(details).length"
                :src="details.author.avatar_url"
              />
              <v-icon
                v-else
                v-text="'mdi-account'"
              />
            </v-avatar>
            <br>
            <div class="font-weight-bold title mt-3">
              {{ details.commit.author.name }}
            </div>
          </v-flex>
          <v-flex xs6>
            <v-layout
              wrap
              pb-3
            >
              <v-flex
                xs4
                text-xs-center
              >
                <span class="title">Total Additions</span>
              </v-flex>
              <v-flex
                xs4
                text-xs-center
              >
                <span class="title">Total Deletions</span>
              </v-flex>
              <v-flex
                xs4
                text-xs-center
              >
                <span class="title">Total Overall</span>
              </v-flex>
              <v-flex
                xs4
                text-xs-center
              >
                <span class="headline green--text">+{{ details.stats.additions }}</span>
              </v-flex>
              <v-flex
                xs4
                text-xs-center
              >
                <span class="headline red--text">-{{ details.stats.deletions }}</span>
              </v-flex>
              <v-flex
                xs4
                text-xs-center
              >
                <span class="headline blue--text">{{ details.stats.total }}</span>
              </v-flex>
            </v-layout>
            <v-subheader v-text="'All Files Changed'" />
            <div
              :style="{maxHeight: computedHeight}"
              style="overflow-x:hidden;"
              class="scroll-y"
            >
              <v-list>
                <v-list-tile
                  v-for="file in details.files"
                  :key="file.sha"
                >
                  <v-list-tile-content v-text="file.filename" />
                </v-list-tile>
              </v-list>
            </div>
          </v-flex>
        </template>
        <template v-else>
          <v-progress-circular
            :size="70"
            :width="5"
            color="primary"
            indeterminate
          />
        </template>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import { convertToUnit } from 'vuetify/es5/util/helpers'
import { mapActions } from 'vuex'

export default {
  props: {
    sha: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      details: {},
    }
  },
  computed: {
    computedHeight () {
      return convertToUnit('560px')
    },
  },
  async created () {
    this.loading = true
    try {
      this.details = await this.fetchCommit(this.sha)
    } catch (e) {
      this.$snackbar.error('Error fetching commits.')
    } finally {
      this.loading = false
    }
  },
  methods: {
    ...mapActions('github', [
      'fetchCommit',
    ]),
    goBack () {
      const query = {}
      if (this.$route.query.page) query.page = this.$route.query.page
      if (this.$route.query.per_page) query.per_page = this.$route.query.per_page
      this.$router.push({ path: '/commits', query })
    },
  },
}
</script>

<style>

</style>
