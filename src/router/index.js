import { createRouter, createWebHistory } from 'vue-router'
import MenuList from '@/views/menu/MenuList.vue'
import MenuDetail from '@/views/menu/MenuDetail.vue'
import MenuCardFunction from '@/views/menu/MenuCardFunction.vue'
import MenuCardFilter from '@/views/menu/MenuCardFilter.vue'
import MSLoading from '@/components/base/MSLoading'
const routes = [
  {
    path: '/',
    name: 'menu',
    component: MenuList
  },
  {
    path: '/about',
    name: 'about',
    component: MenuDetail
  },
  {
    path: '/card',
    name: 'card',
    component: MenuCardFunction
  },
  {
    path: '/loading',
    name: 'loading',
    component: MSLoading
  },
  {
    path: '/cardfilter',
    name: 'filter',
    component: MenuCardFilter
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
