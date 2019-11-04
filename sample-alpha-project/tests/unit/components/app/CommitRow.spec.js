import { shallowMount } from '@vue/test-utils'
import CommitRow from '@/components/app/CommitRow.vue'

const commit = {
  sha: '175b9acfd438be86de7687bc48bf9d84c0ee4949',
  author: {
    login: 'TestUsername',
  },
  commit: {
    message: 'Test Commit Message',
    author: {
      date: '2019-03-25T15:49:30.674Z',
    },
  },
}

describe('CommitRow.vue', () => {
  it('renders correctly when commit passed', () => {
    const wrapper = shallowMount(CommitRow, {
      propsData: {
        commit,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('renders correctly when commit passed', () => {
    const pushSpy = jest.fn()
    const wrapper = shallowMount(CommitRow, {
      propsData: {
        commit,
      },
      mocks: {
        $router: {
          push: pushSpy,
        },
        $route: {
          query: {},
        },
      },
    })
    wrapper.vm.goToDetails()
    expect(pushSpy).toHaveBeenCalledWith({ path: `/commits/${commit.sha}`, query: { page: 1, per_page: 10 } })
  })
})
