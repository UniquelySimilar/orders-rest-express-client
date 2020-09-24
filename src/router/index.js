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
  {
    path: '/customers/:customerId',
    name: 'customerDetailOrders',
    // route level code-splitting (see documentation)
    component: () => import('../views/customer/CustomerDetailOrders.vue'),
    props: true
  },
  {
    path: '/customers/create',
    name: 'customerCreate',
    component: () => import('../views/customer/CustomerCreateOrEdit.vue')
  },
  {
    path: '/customers/:customerId/edit',
    name: 'customerEdit',
    component: () => import('../views/customer/CustomerCreateOrEdit.vue'),
    props: true
  },
  // TODO: Update placeholder routes
  {
    path: '/customers',
    name: 'orderCreate',
    component: CustomerIndex
  },
  {
    path: '/customers',
    name: 'orderEdit',
    component: CustomerIndex
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
