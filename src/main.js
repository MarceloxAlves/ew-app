// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io';
import VueMaterial from 'vue-material'
import VueProgressBar from 'vue-progressbar'
import Notifications from 'vue-notification'
import VueSessionStorage from 'vue-sessionstorage'
import axios from './plugins/axios'
import auth from './plugins/auth'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-dark.css' // This line here
import 'axios-progress-bar/dist/nprogress.css'

Vue.use(VueMaterial)
Vue.prototype.$http = axios
Vue.prototype.$auth =  auth

Vue.use(Notifications)
Vue.use(VueSessionStorage)
Vue.use(VueSocketio, 'https://editworld-server.herokuapp.com/');

Vue.config.productionTip = false

const optionsProgresso = {
  color: '#773E17',
  failedColor: '#FF0909',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  position: 'fixed',
  inverse: false
}

Vue.use(VueProgressBar, optionsProgresso)

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
