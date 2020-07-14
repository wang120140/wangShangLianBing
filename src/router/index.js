import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Auto from "@/components/autoXunHuan"
import ReadExcel from '@/components/ReadExcel'
import Index from '@/components/index'

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
