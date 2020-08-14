import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'

Vue.use(Router)

const routes = [
  { path: '/', component: Index },
  { path: '/bar', component: () => import('@/views/detail/detail') }
]

export default new Router({
  base: "/sunhe-qrcode/",
  mode: 'history',
  routes
})
