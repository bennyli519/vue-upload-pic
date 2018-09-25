import Vue from 'vue'
import Router from 'vue-router'
import Create from '@/components/Create'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Create
    }
  ]
})
