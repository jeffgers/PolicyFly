<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <v-toolbar
          color="white"
          flat
        >
          <v-toolbar-title v-text="'Commits'" />
          <v-spacer />
          <v-select
            v-model="author"
            :items="contributors"
            item-text="login"
            item-value="login"
            clearable
            prepend-icon="mdi-account"
            placeholder="Search by contributor..."
            style="padding-top:30px;"
            @change="debounceSearch"
          />
          <v-text-field
            v-model="sha"
            hide-details
            flat
            class="sha-input"
            append-icon="mdi-close"
            prepend-icon="mdi-code-tags"
            placeholder="Search by SHA..."
            single-line
            @input="debounceSearch"
          />
          <v-tooltip
            bottom
          >
            <template v-slot:activator="{ on }">
              <v-icon
                class="pt-3"
                color="info"
                v-on="on"
              >
                mdi-information
              </v-icon>
            </template>
            <span>SHA or branch to start listing commits from. Default: master</span>
          </v-tooltip>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="commits"
          :rows-per-page-items="[10,25,50,100]"
          :pagination.sync="pagination"
          :loading="searching"
          hide-actions
          @update:pagination="saveSort"
        >
          <template v-slot:items="props">
            <app-commit-row :commit="props.item" />
          </template>
        </v-data-table>
      </v-flex>
      <v-flex xs2>
        <v-btn
          block
          color="primary"
          :disabled="disablePrevious"
          @click="changePage(--page)"
        >
          <v-icon left>
            mdi-chevron-left
          </v-icon>
          Previous
        </v-btn>
      </v-flex>
      <v-flex
        xs8
        text-xs-center
        pt-2
      >
        <span class="font-weight-bold">Page {{ page }}</span>
      </v-flex>
      <v-flex xs2>
        <v-btn
          block
          color="primary"
          @click="changePage(++page)"
        >
          Next
          <v-icon right>
            mdi-chevron-right
          </v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import debounce from 'lodash.debounce'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Commits',

  data () {
    return {
      sha: '',
      author: '',
      headers: [
        {
          text: 'Author',
          sortable: true,
          value: 'author.login',
          width: '150px',
        },
        {
          text: 'SHA Hash',
          sortable: false,
          value: 'sha',
        },
        {
          text: 'Commit Message',
          sortable: true,
          value: 'commit.message',
        },
        {
          text: 'Date',
          sortable: false,
          value: 'author.date',
          width: '200px',
        },
      ],
      page: 1,
      rowsPerPage: 10,
      searching: false,
      pagination: {
        sortBy: 'author.date',
      },
    }
  },

  computed: {
    ...mapState('github', ['commits', 'contributors']),
    disablePrevious () {
      return this.page === 1
    },
  },

  watch: {
    author (val) {
      if (val) {
        localStorage.setItem('author', val)
      } else {
        localStorage.removeItem('author')
      }
    },
  },

  async created () {
    // Since contributors changes infrequently, use cache
    if (!this.contributors.length) await this.fetchContributors()

    let params = {}

    // read from local storage if available
    let sha = localStorage.getItem('sha')
    if (sha) {
      params.sha = sha
      this.sha = sha
    }

    let author = localStorage.getItem('author')
    if (author) {
      params.author = author
      this.author = author
    }

    if (this.$route.query.page) this.page = this.$route.query.page
    if (this.$route.query.per_page) this.rowsPerPage = this.$route.query.per_page

    try {
      this.fetchCommits(params)
    } catch (e) {
      this.$snackbar.error('Error fetching commits.')
    }

    if (localStorage.getItem('sortBy')) {
      this.pagination.sortBy = localStorage.getItem('sortBy')
    }
    if (localStorage.getItem('sortDesc')) {
      this.pagination.descending = localStorage.getItem('sortDesc') !== 'false'
    }
  },

  methods: {
    ...mapActions('github', [
      'fetchCommits',
      'fetchContributors',
    ]),
    async changePage (newPage) {
      this.$router.push({
        path: this.$route.path,
        query: {
          page: this.page,
          per_page: this.rowsPerPage,
        },
      })
      const params = { page: newPage, limit: this.rowsPerPage }
      if (this.sha) params.sha = this.sha
      if (this.author) params.author = this.author
      await this.fetchCommits(params)
    },
    debounceSearch: debounce(function (e) {
      this.searching = true
      const params = { page: 1, limit: this.rowsPerPage }
      if (this.sha) params.sha = this.sha
      if (this.author) params.author = this.author
      this.fetchCommits(params)
      this.searching = false
    }, 200),
    saveSort (data) {
      if (data.sortBy) {
        localStorage.setItem('sortBy', data.sortBy)
        localStorage.setItem('sortDesc', data.descending)
      } else {
        localStorage.removeItem('sortBy')
        localStorage.removeItem('sortDesc')
      }
    },
  },
}
</script>

<style>
.sha-input .v-input__icon--append {
  cursor: pointer
}
</style>
