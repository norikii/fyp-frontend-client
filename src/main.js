
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import router from './router'
import store from './store'

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
  render: h => h(App)
}).$mount('#app')
