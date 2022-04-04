import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../pages/Layout.vue'

export const menuRoutes = [
  {
    path: 'home',
    name: 'Home',
    meta: { title: '首页', icon: 'home' },
    component: () => import('../pages/home/Home.vue')
  },
  {
    path: 'user',
    name: 'User',
    meta: { title: '用户管理', icon: 'manage_accounts' },
    component: () => import('../pages/user/User.vue')
  },
  {
    path: 'music',
    name: 'Music',
    meta: { title: '歌曲管理', icon: 'music_note' },
    component: () => import('../pages/music/Music.vue')
  }
]

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: 'home',
    children: menuRoutes
  },
  {
    path: '/login',
    component: () => import('../pages/Login.vue')
  },
  {
    path: '/403',
    component: () => import('../pages/403.vue')
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('../pages/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
