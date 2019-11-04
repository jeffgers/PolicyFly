/* eslint-disable no-undef */
const requireModule = require.context('.', true, /\.[t|j]s$/)
const modules = {}

requireModule.keys().forEach(fileName => {
  if (fileName === './index.js') return

  // Replace ./ and .js
  const path = fileName.replace(/(\.\/|\.[t|j]s)/g, '')
  const [moduleName, imported] = path.split('/')

  if (!modules[moduleName]) {
    modules[moduleName] = {
      namespaced: true,
    }
  }

  modules[moduleName][imported] = requireModule(fileName).default
})

// add non-directory modules onto `modules` here

export default modules
