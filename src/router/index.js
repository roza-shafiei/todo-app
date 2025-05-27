import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Todo List',
      },
    },
    {
      path: '/create',
      name: 'create-todo',
      component: ()=> import('../views/CreateTodoView.vue'),
      meta: {
        title: 'Create Todo',
      },
    },
  ],
})
router.beforeEach((to) => {
  document.title = to.meta.title
})
export default router
