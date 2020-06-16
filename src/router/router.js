import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
let routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/components/dashboard/dashboard')
  },
  {
    path: '/big',
    name: 'Bigscreen',
    meta: {
      title: '新媒体大屏统计分析'
    },
    component: () => import('@/views/bigscreen/Screenbox.vue')
  },
  {
    path: '/excellent',
    name: 'Excellent',
    component: () => import('@/views/bigscreen/Excellent.vue')
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: () => import('@/views/bigscreen/Analysis.vue')
  },
  {
    path: '/iframe',
    name: 'Iframe',
    component: () => import('@/views/bigscreen/Iframe.vue')
  }
]
const router = new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? window.g.base : '/',
  linkActiveClass: 'active',
  routes,
  // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
export default router
