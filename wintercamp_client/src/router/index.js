import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import tech from '@/components/tech'
import design from '@/components/design'
import code from '@/components/code'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path:'/tech/:name/:school/:id',
      name:"tech",
      component: tech
    },
    {
      path:'/code/:name/:school',
      name:'code',
      component:code
    },
    {
      path:'/design/:name/:school/:id',
      name:"tech",
      component: design
    }
  ]
})
