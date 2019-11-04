import Vue from 'vue'
import upperFirst from 'lodash.upperfirst'
import camelCase from 'lodash.camelcase'

/* eslint-disable no-undef */
const requireComponent = require.context(
  '@/components', true, /\.vue$/,
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')),
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})
