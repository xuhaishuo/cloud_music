import Vue from 'vue'
import App from './App.vue'
// 完整引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入全局样式表
import './assets/index.css'

// 引入路由
import router from './router/index'
// 导入axios
import axios from 'axios'
// 设置axios请求的根路径
axios.defaults.baseURL = 'http://localhost:3000'
// 将axios挂载到Vue的原型对象上
Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.prototype.$message = ElementUI.Message

Vue.filter('dateYear',(date_y) => {
  const date = new Date(date_y)
  const year = date.getFullYear();
  const month = (date.getMonth() + 1 + '').padStart(2,'0');
  const day = (date.getDay() + 1 + '').padStart(2,'0')
  return `${year}-${month}-${day}`
})

Vue.filter("dateFormat",(date_t) => {
  const date = new Date(date_t)
  const minutes = (date.getMinutes() + '').padStart(2,'0')
  const seconds = (date.getSeconds() + '').padStart(2,'0')
  return `${minutes}:${seconds}`
})

Vue.filter('dateFull',(date_a) => {
  const date = new Date(date_a)
  const year = date.getFullYear();
  const month = (date.getMonth() + 1 + '').padStart(2,'0');
  const day = (date.getDay() + 1 + '').padStart(2,'0')
  const hour = (date.getHours() + '').padStart(2,'0')
  const minutes = (date.getMinutes() + '').padStart(2,'0')
  const seconds = (date.getSeconds() + '').padStart(2,'0')
  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
})

Vue.filter('strFormat',(cnt) => {
  return cnt > 100000 ? parseInt(cnt/10000) + '万' : cnt
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
