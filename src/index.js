import '@babel/polyfill'

// Packages
import axios from 'axios'
import Vue from 'vue'
import Vuetify from 'vuetify'

import JsonViewer from 'vue-json-viewer'

import App from './app/component.vue'

Vue.use(Vuetify)
Vue.use(JsonViewer)

Vue.prototype.$http = axios

new Vue({
  el: '#app',
  render: h => h(App)
})
