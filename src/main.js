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
document.cookie = "bvb0ldihgnp55ds1jr8lh3skb0;"
document.cookie = 'HyGHnOvkdQZ0y=34294;'
document.cookie = 'safetycode=6293;'

//"PHPSESSID=bvb0ldihgnp55ds1jr8lh3skb0; HyGHnOvkdQZ0y=34294; safetycode=6293"
// "PHPSESSID=bvb0ldihgnp55ds1jr8lh3skb0; HyGHnOvkdQZ0y=34322; safetycode=7118"
// "PHPSESSID=697o72ue9hg3nj495oit4v2v45; HyGHnOvkdQZ0y=34322; safetycode=2774; Hm_lvt_eaa57ca47dacb4ad4f5a257001a3457c=1573265102,1573279361,1573432222,1573452755; Hm_lpvt_eaa57ca47dacb4ad4f5a257001a3457c=1573452943"
// "HyGHnOvkdQZ0y=34322; safetycode=5267; PHPSESSID=sdi5r05q7bedt4mmm8l0adqo25"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
