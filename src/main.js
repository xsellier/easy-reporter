import '@babel/polyfill'

// Packages
import axios from 'axios'
import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'
import VueMaterial from 'vue-material'
import JsonViewer from 'vue-json-viewer'
import 'vue-material/dist/vue-material.css'

Vue.use(VueApexCharts)
Vue.use(VueMaterial)
Vue.use(JsonViewer)

Vue.prototype.$http = axios

import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})
