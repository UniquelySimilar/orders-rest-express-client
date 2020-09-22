import Vue from 'vue'
import VueRouter from 'vue-router'
import CustomerIndex from '../views/customer/CustomerIndex.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'customer-index' }
  },
  {
    path: '/customers',
    name: 'customer-index',
    component: CustomerIndex
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
