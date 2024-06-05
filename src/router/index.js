import { createRouter, createWebHistory } from '@ionic/vue-router';
import page from '../views/layout/page.vue'
import print from '../views/layout/auxiliare/printer.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path : '/home',
    component: page
  },
  {
    path : '/print',
    component: print
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
