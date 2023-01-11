import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
         name: 'home',
         path: '/',
         component: HomeView
      },
      {
         name: 'login',
         path: '/login',
         component: LoginView
      },
      {
         name: 'register',
         path: '/register',
         component: RegisterView
      }
   ]
})

export default router