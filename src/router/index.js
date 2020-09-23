import Vue from 'vue'
import VueRouter from 'vue-router'
import CustomerIndex from '../views/customer/CustomerIndex.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'customerIndex' }
  },
  {
    path: '/customers',
    name: 'customerIndex',
    component: CustomerIndex
  },
  // TODO: Update placeholder routes
  {
    path: '/customers',
    name: 'customerCreate',
    component: CustomerIndex
  },
  {
    path: '/customers',
    name: 'customerEdit',
    component: CustomerIndex
  },
  {
    path: '/customers',
    name: 'customerDetailOrders',
    component: CustomerIndex
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
