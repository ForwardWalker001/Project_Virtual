import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = "http://localhost:3000"

Vue.prototype.$EventBus = new Vue()

document.title = '风力发电虚拟仿真系统'

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
