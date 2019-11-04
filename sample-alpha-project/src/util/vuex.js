import { getObjectValueByPath } from 'vuetify/es5/util/helpers'
export const set = (property) => (state, payload) => (state[property] = payload)

export const setNested = (property) => (state, payload) => {
  const split = property.split('.')
  const target = split.pop()
  let value = getObjectValueByPath(state, split.join('.'))

  /* istanbul ignore next */
  if (!value) {
    return // console.warn(`Unable to find nested value ${property}`)
  }

  /* istanbul ignore next */
  if (value !== Object(value)) {
    return // console.warn(`Target <${target}> is not an object`)
  }

  /* istanbul ignore next */
  if (!(target in value)) {
    return // console.warn(`Value <${value}> not found in object ${split.join('.')}`)
  }

  value[target] = payload
}

export const push = (property) => (state, payload) => state[property].push(payload)

export const pushOrUpdate = (property) => (state, payload) => {
  const index = state[property].findIndex((o) => o.id === payload.id)

  index > -1
    ? state[property].splice(index, 1, payload)
    : state[property].push(payload)
}

export const unshiftOrUpdate = (property) => (state, payload) => {
  const index = state[property].findIndex((o) => o.id === payload.id)

  index > -1
    ? state[property].splice(index, 1, payload)
    : state[property].unshift(payload)
}

export const concat = (property) => (state, payload) => {
  state[property] = state[property].concat(payload)
}

export const updateKey = (property, key) => (state, payload) => {
  state[property] = Object.assign({},
    state[property],
    { [key]: payload },
  )
}
