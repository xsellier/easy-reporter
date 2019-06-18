import '@babel/polyfill'

// Packages
import axios from 'axios'
import Vue from 'vue'
import Vuetify from 'vuetify'

import VueApexCharts from 'vue-apexcharts'
import JsonViewer from 'vue-json-viewer'

Vue.use(VueApexCharts)
Vue.use(Vuetify)
Vue.use(JsonViewer)

Vue.prototype.$http = axios

import App from './app/component.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})
