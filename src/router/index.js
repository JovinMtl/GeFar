import { createRouter, createWebHistory } from '@ionic/vue-router';
import page from '../views/layout/page.vue'
// import print from '../views/layout/auxiliare/printer.vue'
import disponible from '../views/operations/output/disponible.vue'
import Logi from '../views/auth/login.vue'
import Invita from '../views/layout/auxiliare/invita.vue'
import { components } from 'vuetify/dist/vuetify-labs.js';

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
    component: disponible
  },
  {
    path : '/logi',
    component: Logi,
  },
  {
    path : '/invite',
    component: Invita
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
