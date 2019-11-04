import { set, push } from '@/util/vuex'

export default {
  setCommits: set('commits'),
  pushCommit: push('commits'),
  setContributors: set('contributors'),
  pushContributors: push('contributors'),
}
