import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from '@vue/test-utils'
import Empty from '../Empty'
import appState from '@/store/modules/app/state'
import appMutations from '@/store/modules/app/mutations'
import '@/plugins/snackbar'

Vue.use(Vuex)

describe('Snackbar.js', () => {
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

  it('should return message helpers from $snackbar', async () => {
    const wrapper = mount(Empty, {
      store,
    })
    expect(wrapper.vm.$snackbar).toEqual({
      default: expect.any(Function),
      error: expect.any(Function),
      info: expect.any(Function),
      success: expect.any(Function),
      warning: expect.any(Function),
    })
  })
  it('should call store when $message called', async () => {
    const wrapper = mount(Empty, {
      store,
    })
    const spy = jest.spyOn(wrapper.vm.$store, 'commit')
    wrapper.vm.$message('error', 'msg', 3000)
    expect(spy).toHaveBeenCalledWith('app/setSnackbar', {
      type: 'error',
      msg: 'msg',
      timeout: 3000,
      close: false,
    })
  })
  it('should allow calling $snackbar helper', async () => {
    const wrapper = mount(Empty, {
      store,
    })
    const spy = jest.spyOn(wrapper.vm.$store, 'commit')
    wrapper.vm.$snackbar.default('msg', 1000)
    wrapper.vm.$snackbar.error('msg', 1000)
    wrapper.vm.$snackbar.info('msg', 1000)
    wrapper.vm.$snackbar.success('msg', 1000)
    wrapper.vm.$snackbar.warning('msg', 1000)
    expect(spy).toBeCalledTimes(5)
  })
})
