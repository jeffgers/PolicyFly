import Vuex from 'vuex'
import { shallowMount } from '@vue/test-utils'
import githubState from '@/store/modules/github/state'
import githubMutations from '@/store/modules/github/mutations'
import CommitCard from '@/components/app/CommitCard.vue'

const $snackbar = {
  error: jest.fn(),
}

describe('CommitCard.vue', () => {
  let store
  let fetchSpy = jest.fn().mockResolvedValue({
    'sha': '175b9acfd438be86de7687bc48bf9d84c0ee4949',
    'node_id': 'MDY6Q29tbWl0Njc5NjI2NDg6MTc1YjlhY2ZkNDM4YmU4NmRlNzY4N2JjNDhiZjlkODRjMGVlNDk0OQ==',
    'commit': {
      'author': {
        'name': 'MajesticPotatoe',
        'email': 'AMajesticPotatoe@gmail.com',
        'date': '2019-03-22T13:34:45Z',
      },
      'committer': {
        'name': 'MajesticPotatoe',
        'email': 'AMajesticPotatoe@gmail.com',
        'date': '2019-03-22T13:35:29Z',
      },
      'message': 'docs: update search-input prop desc\n\nCloses #6794',
      'url': 'https://api.github.com/repos/vuetifyjs/vuetify/git/commits/175b9acfd438be86de7687bc48bf9d84c0ee4949',
      'comment_count': 0,
      'verification': {
        'verified': false,
        'reason': 'unsigned',
        'signature': null,
        'payload': null,
      },
    },
    'author': {
      'login': 'MajesticPotatoe',
      'id': 27827979,
      'avatar_url': 'https://avatars1.githubusercontent.com/u/27827979?v=4',
      'type': 'User',
      'site_admin': false,
    },
    'committer': {
      'login': 'MajesticPotatoe',
      'id': 27827979,
      'node_id': 'MDQ6VXNlcjI3ODI3OTc5',
      'avatar_url': 'https://avatars1.githubusercontent.com/u/27827979?v=4',
      'type': 'User',
      'site_admin': false,
    },
    'stats': {
      'total': 2,
      'additions': 1,
      'deletions': 1,
    },
    'files': [
      {
        'sha': '266a65415a56f6d531b5571aa4a388896ba7923f',
        'filename': 'packages/docs/src/lang/en/components/Selects.json',
        'status': 'modified',
        'additions': 1,
        'deletions': 1,
        'changes': 2,
        'blob_url': 'https://github.com/vuetifyjs/vuetify/blob/175b9acfd438be86de7687bc48bf9d84c0ee4949/packages/docs/src/lang/en/components/Selects.json',
        'raw_url': 'https://github.com/vuetifyjs/vuetify/raw/175b9acfd438be86de7687bc48bf9d84c0ee4949/packages/docs/src/lang/en/components/Selects.json',
        'contents_url': 'https://api.github.com/repos/vuetifyjs/vuetify/contents/packages/docs/src/lang/en/components/Selects.json?ref=175b9acfd438be86de7687bc48bf9d84c0ee4949',
        'patch': '@@ -61,7 +61,7 @@\n     "openOnClear": "When using the **clearable** prop, once cleared, the select menu will either open or stay open, depending on the current state",\n     "overflow": "Creates an overflow button - [spec](https://material.io/guidelines/components/buttons.html#buttons-dropdown-buttons)",\n     "returnObject": "Changes the selection behavior to return the object directly rather than the value specified with **item-value**",\n-    "searchInput": "Bound when using the autocomplete prop. Use the **.sync** modifier to catch user input from the autocomplete search input",\n+    "searchInput": "Use the **.sync** modifier to catch user input from the search input",\n     "segmented": "Creates a segmented button - [spec](https://material.io/guidelines/components/buttons.html#buttons-dropdown-buttons)",\n     "smallChips": "Changes display of selections to chips with the **small** property",\n     "tags": "Tagging functionality, allows the user to create new values not available from the **items** prop",',
      },
    ],
  })
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        github: {
          namespaced: true,
          state: githubState,
          mutations: githubMutations,
          actions: {
            fetchCommit: fetchSpy,
          },
        },
      },
    })
  })
  it('renders correctly when commit loaded', async () => {
    const wrapper = shallowMount(CommitCard, {
      propsData: {
        sha: '175b9acfd438be86de7687bc48bf9d84c0ee4949',
      },
      mocks: {
        $snackbar,
      },
      store,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders correctly when commit not loaded yet', async () => {
    const wrapper = shallowMount(CommitCard, {
      propsData: {
        sha: '175b9acfd438be86de7687bc48bf9d84c0ee4949',
      },
      mocks: {
        $snackbar,
      },
      store,
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
