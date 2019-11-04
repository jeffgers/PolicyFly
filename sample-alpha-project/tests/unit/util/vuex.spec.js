import * as vuex from '@/util/vuex'

describe('vuex.ts', () => {
  it('should set a property', () => {
    const set = vuex.set('foo')
    const state = {
      foo: null,
    }

    set(state, 'bar')
    expect(state).toEqual({ foo: 'bar' })
  })

  it('should set a nested property', () => {
    const setNested = vuex.setNested('foo.bar.fizz')
    const state = {
      foo: {
        bar: {
          fizz: null,
        },
      },
    }

    setNested(state, 'buzz')
    expect(state).toEqual({
      foo: {
        bar: {
          fizz: 'buzz',
        },
      },
    })
  })

  it('should concat a property', () => {
    const concat = vuex.concat('foo')
    const state = {
      foo: [],
    }

    concat(state, ['bar'])
    expect(state).toEqual({ foo: ['bar'] })
  })

  it('should push a property', () => {
    const push = vuex.push('foo')
    const state = {
      foo: [],
    }

    push(state, 'bar')
    expect(state).toEqual({ foo: ['bar'] })
  })

  it('should push or update a property', () => {
    const pushOrUpdate = vuex.pushOrUpdate('foo')
    const state = {
      foo: [],
    }

    pushOrUpdate(state, { id: 'fizz', text: 'buzz' })
    expect(state).toEqual({
      foo: [{ id: 'fizz', text: 'buzz' }],
    })

    pushOrUpdate(state, { id: 'fizzbuzz', text: 'buzz' })
    expect(state).toEqual({
      foo: [
        { id: 'fizz', text: 'buzz' },
        { id: 'fizzbuzz', text: 'buzz' },
      ],
    })

    pushOrUpdate(state, { id: 'fizz', text: 'fizzbuzz' })
    expect(state).toEqual({
      foo: [
        { id: 'fizz', text: 'fizzbuzz' },
        { id: 'fizzbuzz', text: 'buzz' },
      ],
    })
  })

  it('should unshift or update a property', () => {
    const unshiftOrUpdate = vuex.unshiftOrUpdate('foo')
    const state = {
      foo: [],
    }

    unshiftOrUpdate(state, { id: 'fizz', text: 'buzz' })
    expect(state).toEqual({
      foo: [{ id: 'fizz', text: 'buzz' }],
    })

    unshiftOrUpdate(state, { id: 'fizzbuzz', text: 'buzz' })
    expect(state).toEqual({
      foo: [
        { id: 'fizzbuzz', text: 'buzz' },
        { id: 'fizz', text: 'buzz' },
      ],
    })

    unshiftOrUpdate(state, { id: 'fizz', text: 'fizzbuzz' })
    expect(state).toEqual({
      foo: [
        { id: 'fizzbuzz', text: 'buzz' },
        { id: 'fizz', text: 'fizzbuzz' },
      ],
    })
  })

  it('should update key', () => {
    const updateKey = vuex.updateKey('foo', 'bar')
    const state = {
      foo: {},
    }

    updateKey(state, 'foo')
    expect(state).toEqual({
      foo: {
        bar: 'foo',
      },
    })

    updateKey(state, 'buzz')
    expect(state).toEqual({
      foo: {
        bar: 'buzz',
      },
    })
  })
})
