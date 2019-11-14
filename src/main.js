// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);

Vue.prototype.$axios = axios
axios.defaults.withCredentials=true;//让ajax携带cookie
axios.defaults.baseURL = '/api'  //关键代码
Vue.config.productionTip = false
document.cookie = "PHPSESSID=a5k7h1idne59vkiif9frprj5l5;"
document.cookie = 'HyGHnOvkdQZ0y=34326'
document.cookie = 'safetycode=9024;'
// "PHPSESSID=jnmocpm5q0vnehu03u2g3h68q3; HyGHnOvkdQZ0y=34322; safetycode=9868; 
// "PHPSESSID=a5k7h1idne59vkiif9frprj5l5; HyGHnOvkdQZ0y=34326; safetycode=9024; 
// "PHPSESSID=a5k7h1idne59vkiif9frprj5l5; HyGHnOvkdQZ0y=34322; safetycode=2813; Hm_lvt_eaa57ca47dacb4ad4f5a257001a3457c=1573518798,1573538484,1573540843,1573609361; Hm_lpvt_eaa57ca47dacb4ad4f5a257001a3457c=1573609361"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
