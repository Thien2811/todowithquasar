import IndexViewVue from '@/views/IndexView.vue'
import AllTaskViewVue from '@/views/AllTaskView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/createlistandtask',
      name: 'createlistandtask',
      component: IndexViewVue
    },
    {
      path: '/alltask',
      name: 'alltask',
      component: AllTaskViewVue
    }
  ]
})

export default router
