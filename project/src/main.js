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
Vue.prototype.$EventBus.tableData = [
  {
    content: "查看实验相关介绍",
    score: 10,
    isComplete: false,
  },
  {
    content: "启动电机",
    score: 10,
    isComplete: false,
  },
  {
    content: "改变风速并观察风机情况",
    score: 10,
    isComplete: false,
  },
  {
    content: "改变风向并观察风机情况",
    score: 20,
    isComplete: false,
  },
  {
    content: "观察多风机运行情况",
    score: 10,
    isComplete: false,
  },
],
document.title = '风力发电虚拟仿真系统'

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
