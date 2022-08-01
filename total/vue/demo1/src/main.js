import Vue from 'vue'
import App from './App.vue'
import VueShepherd from 'vue-shepherd'



Vue.config.productionTip = false

Vue.use(VueShepherd)

new Vue({
  render: h => h(App),
}).$mount('#app')
