
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import router from './router'
import store from './store'
import axios from 'axios'

require("./assets/scss/main.scss");


// side bar
import Vue from 'vue'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
Vue.use(VueSidebarMenu);

Vue.config.productionTip = false;
Vue.use(Buefy);


new Vue({
  router,
  store,
  created () {
    const userString = localStorage.getItem('user');
    // when the app is created we check if there is a user in our local storage
    if (userString) {
      // if there is we are restoring it in our sore
      const userData = JSON.parse(userString);
      this.$store.commit('SET_USER_DATA', userData)
    }
    axios.interceptors.response.use(
        response => response,
        error => {
          if (error.response.status === 401) {
            this.$store.dispatch('logout')
          }
          return Promise.reject(error);
        }
    )

  },
  render: h => h(App)
}).$mount('#app');
