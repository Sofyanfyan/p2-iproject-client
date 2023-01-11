import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import BrowseView from '../views/BrowseView.vue'
import DetailView from '../views/DetailView.vue'
import ProfileView from '../views/ProfileView.vue'
import PaymentView from '../views/PaymentView.vue'

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
      },
      {
         name: 'browse',
         path: '/browse',
         component: BrowseView
      },
      {
         name:'profile', 
         path: '/profile',
         component: ProfileView
      },
      {
         name: 'payment',
         path: '/payment',
         component: PaymentView
      },
      {
         name: 'detail',
         path: '/:gameId',
         component: DetailView
      },
      
      
      // { 
      //    name: 'NotFound', 
      //    path: '/:pathMatch(.*)*', 
      //    component: NotFound 
      // },
   ]
})

export default router
