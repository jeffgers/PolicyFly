import { mount } from '@vue/test-utils'

import Toolbar from '@/components/core/Toolbar'

describe('Toolbar.vue', () => {
  it('should match snapshot', () => {
    const wrapper = mount(Toolbar, {
      mocks: {
        $http: {
          get: jest.fn().mockResolvedValue({ data: { resources: { core: {} } } }),
        },
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should fetch rate limit on create', () => {
    const spy = jest.fn()
    mount(Toolbar, {
      mocks: {
        $http: {
          get: spy,
        },
      },
    })
    expect(spy).toHaveBeenCalledWith('https://api.github.com/rate_limit')
  })
})
