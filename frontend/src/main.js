import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Toasted from 'vue-toasted'
import VueRouter from 'vue-router';
// import Thankyou from './components/Thankyou.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'home', component: App },
    // { path: '/thankyou', name: 'thankyou', component: Thankyou }
  ]
});


Vue.use(Toasted, {
  duration: 9000,
  position: 'top-right',
  action : {
    text : 'Okay',
    onClick : (e, toastObject) => {
        toastObject.goAway(0);
    }
  }
})

Vue.config.productionTip = false

const app = new Vue({
  store,
  router,
  vuetify,
  render: function(h) {
    return h(App)
  },
}).$mount('#app')

if (window.Cypress) {
  // only available during E2E tests
  window.app = app
}
