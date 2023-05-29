import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ListTripsView from '@/views/ListTripsView.vue'
import UserView from '@/views/users/UserView.vue'
import UserProfileView from '@/views/users/UserProfileView.vue'
import UserListTripsView from '@/views/users/UserListTripsView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import AdminView from '@/views/admin/AdminView.vue'
import BusesManagementView from '@/views/admin/BusesManagementView.vue'
import UserManagementView from '@/views/admin/UserManagementView.vue'
import AdminLoginView from '@/views/admin/AdminLoginView.vue'
import JourneyManagementView from '@/views/admin/JourneyManagementView.vue'
import TripManagementView from '@/views/admin/TripManagementView.vue'
import OrderManagementView from '@/views/admin/OrderManagementView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: false }
    },
    {
      path: '/list-trips',
      name: 'list-trips',
      component: ListTripsView,
      meta: { requiresAuth: false }
    },
    {
      path: '/users',
      component: UserView,
      children: [
        {
          path: '',
          name: 'users',
          component: UserProfileView
        },
        {
          path: 'list-trips',
          name: 'users.list-trips',
          component: UserListTripsView
        }
      ],
      meta: { requiresAuth: true }
    },
    {
      path: '/admins',
      component: AdminView,
      children: [
        {
          path: '',
          name: 'admins',
          component: BusesManagementView
        },
        {
          path: 'list-users',
          name: 'admins.list-users',
          component: UserManagementView
        },
        {
          path: 'list-journeys',
          name: 'admins.list-journeys',
          component: JourneyManagementView
        },
        {
          path: 'list-trips',
          name: 'admins.list-trips',
          component: TripManagementView
        },
        {
          path: 'list-orders',
          name: 'admins.list-orders',
          component: OrderManagementView
        }
      ],
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/admins/login',
      name: 'admins.login',
      component: AdminLoginView,
      meta: { requiresAuth: false }
    }
  ]
})

export default router
