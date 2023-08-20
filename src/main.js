import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
import { Message } from 'element-ui';
// import router from'../src/router'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(ElementUI)


// vue有一点不好的是，他不能自动把前台cookie发送到服务器，所以需要手动把coookie发送到服务器
axios.defaults.withCredentials = true


axios.interceptors.request.use(function (config) {



  return config;
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {


  if (response.data.msg=="请重新登录"){

    router.replace("/")
  }

  return response;
}, function (error) {

  return Promise.reject(error);
});



new Vue({
  router,
  store,
  ElementUI,
  axios,
  render: h => h(App)
}).$mount('#app')
