import { createRouter, createWebHistory } from '@ionic/vue-router';
import page from '../views/layout/page.vue'
// import print from '../views/layout/auxiliare/printer.vue'
import disponible from '../views/operations/output/disponible.vue'
import Login from '../views/auth/login.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path : '/home',
    component: page
  },
  {
    path : '/print',
    component: disponible
  },
  {
    path : '/login',
    component: Login,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
