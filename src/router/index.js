import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Auto from "@/components/autoXunHuan"
import ReadExcel from '@/components/ReadExcel'
<<<<<<< HEAD
import Index from '@/components/index'
=======

>>>>>>> 05a8d1928d7abc3892c06dc8ff80f203a29ceeaf

Vue.use(Router)

export default new Router({
  routes: [
   
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/auto',
      name: 'Auto',
      component:Auto
    },{
      path:'/read',
      name:'自动读取表格内容',
      component:ReadExcel
    }
  ]
})
