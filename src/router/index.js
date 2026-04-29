import { createRouter, createWebHashHistory } from 'vue-router'
import Profile from '../views/Profile.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import { isAuthenticated } from '../utils/auth.js'

const routes = [
  { path: '/', component: Profile },
  { path: '/login', component: Login },
  { path: '/admin', component: Admin, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return '/login'
  }
})

export default router
