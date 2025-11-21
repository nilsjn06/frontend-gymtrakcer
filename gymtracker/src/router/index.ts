import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router' // 👈 das ist der Unterschied!

const routes: RouteRecordRaw[] = [
  { path: '/',         name: 'menu',    component: () => import('@/views/MenuView.vue') },
  { path: '/profile',  name: 'profile', component: () => import('@/views/ProfileView.vue') },
  { path: '/history',  name: 'history', component: () => import('@/views/HistoryView.vue') },
  { path: '/handbuch', name: 'guide',   component: () => import('@/views/HandbuchView.vue') },
  { path: '/workout',  name: 'workout', component: () => import('@/views/WorkoutStartView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
