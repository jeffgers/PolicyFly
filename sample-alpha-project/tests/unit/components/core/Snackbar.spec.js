import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from '@vue/test-utils'
import appState from '@/store/modules/app/state'
import appMutations from '@/store/modules/app/mutations'
import Snackbar from '@/components/core/Snackbar'
import '@/plugins/snackbar'

Vue.use(Vuex)

describe('Snackbar.vue', () => {
  let store
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        app: {
          namespaced: true,
          state: appState,
          mutations: appMutations,
        },
      },
    })
  })

  it('should match snapshot', async () => {
    const wrapper = mount(Snackbar, {
      store,
    })
    // wrapper.vm.model = true
    wrapper.vm.$store.commit('app/setSnackbar', {
      type: 'error',
      timeout: 0,
      msg: 'Error Message',
      close: false,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
