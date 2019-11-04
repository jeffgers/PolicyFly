import Vue from 'vue'
import Router from 'vue-router'
import paths from './routes'

Vue.use(Router)

// Function to create routes
// Is default lazy but can be changed
function route (obj) {
  return {
    path: `/${obj.path}`,
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/views/${obj.view}.vue`),
    children: (obj.children || []).map(r => route(r)),
    meta: { requiresAuth: obj.auth },
  }
}

const routes = paths.map(r => route(r))

export default new Router({
  mode: 'history',
  // eslint-disable-next-line no-undef
  base: process.env.BASE_URL,
  routes,
})
