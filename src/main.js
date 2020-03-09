import firebase from 'firebase'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import settings from './assets/json/settings.json'

Vue.config.productionTip = false

const config = settings.firebaseConfig
firebase.initializeApp(config)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
