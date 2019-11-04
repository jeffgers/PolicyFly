// Plugins
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

// Core components
import Snackbar from '@/components/core/Snackbar'
import Drawer from '@/components/core/Drawer'

// Other components
import CommitCard from '@/components/app/CommitCard'
import CommitRow from '@/components/app/CommitRow'

Vue.use(Vuex)
Vue.use(Vuetify)

Vue.component('core-drawer', Drawer)
Vue.component('core-snackbar', Snackbar)

Vue.component('app-commit-row', CommitRow)
Vue.component('app-commit-card', CommitCard)

const el = document.createElement('div')
el.setAttribute('data-app', true)
document.body.appendChild(el)
