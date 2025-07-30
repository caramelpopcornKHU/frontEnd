import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 메인 화면
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // 고객 정보 수정 화면
    {
      path: '/reviseClient',
      name: 'reviseClient',
      component: () => import('../views/clientRevise.vue'),
    },
    // 고객 정보 추가 화면
    {
      path: '/addClient',
      name: 'addClient',
      component: () => import('../views/clientAdd.vue'),
    }
  ],
})

export default router
