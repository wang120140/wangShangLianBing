// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';


import getCookieValue from './components/cookie'

import store from './store/store'

import Vuex from 'vuex'
 
Vue.use(Vuex)



// Vue.use(ElementUI);

var a = new Date();
var b = a.getFullYear();
var c = a.getMonth();

if(  b == 2020 && c <= 5){
  
  console.log(a,b,c)

  Vue.prototype.$axios = axios
axios.defaults.withCredentials=true;//让ajax携带cookie
axios.defaults.baseURL = '/api'  //关键代码
Vue.config.productionTip = false
document.cookie = getCookieValue.a ;
document.cookie = getCookieValue.b;
document.cookie = getCookieValue.c;

// "PHPSESSID=5r55getchkc58g9khnssj88j17; HyGHnOvkdQZ0y=34322; safetycode=9430"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


}

