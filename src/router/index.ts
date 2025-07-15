import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserLogin from '../views/user/UserLoginView.vue'
import UserRegister from '../views/user/UserRegisterView.vue'
import UserManage from '../views/admin/UserManageView.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/user/login',
    name: 'userLogin',
    component: UserLogin,
  },
  {
    path: '/user/register',
    name: 'userRegister',
    component: UserRegister,
  },
  {
    path: '/admin/userManager',
    name: 'adminUserManager',
    component: UserManage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
