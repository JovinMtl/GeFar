import { createRouter, createWebHistory } from '@ionic/vue-router';
import page from '../views/layout/page.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path : '/home',
    component: page
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
