import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import page from '../views/layout/page.vue'

const routes = [
  {
    path: '/',
    redirect: '/feuille'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path : '/feuille',
    component: page
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
