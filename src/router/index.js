import IndexViewVue from '@/views/IndexView.vue'
import AllTaskViewVue from '@/views/AllTaskView.vue'
import CompletedTaskViewVue from '@/views/CompletedTaskView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import LoginViewVue from '@/views/LoginView.vue'
import RegisterViewVue from '@/views/RegisterView.vue'

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
    },
    {
      path: '/finishedtask',
      name: 'finishedtask',
      component: CompletedTaskViewVue
    },
    {
      path: '/',
      name: 'loginscreen',
      component: LoginViewVue
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterViewVue
    }
  ]
})

export default router
