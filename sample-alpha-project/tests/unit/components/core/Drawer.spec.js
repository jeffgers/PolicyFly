import { mount } from '@vue/test-utils'

import Drawer from '@/components/core/Drawer'

describe('Drawer.vue', () => {
  it('should match snapshot', () => {
    const wrapper = mount(Drawer, {
      stubs: ['router-link'],
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
