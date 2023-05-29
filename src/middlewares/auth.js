import router from '@/router'
import UserRepository from '@/repositories/UserRepository'

router.beforeEach((to, from, next) => {
  const userRepository = new UserRepository(import.meta.env.VITE_API_BASE_URL)

  if (to.name !== 'admins' && to.name !== 'admins.login' && to.name !== 'admins.list-users') {
    if (localStorage.getItem('jwt_token')) {
      userRepository.getProfile().then((response) => {
        localStorage.setItem('userData', JSON.stringify(response.data))
        if (to.matched.some(record => record.meta.requiresAuth)) {
          next()
        } else if ((to.name === 'login' || to.name === 'register' || to.name === 'forgot-password')) {
          next({ name: 'users' })
        } else {
          next()
        }
      }).catch(() => {
        localStorage.removeItem('userData')
        if (to.matched.some(record => record.meta.requiresAuth)) {
          next({ name: 'login' })
        } else {
          next()
        }
      })
    } else {
      localStorage.removeItem('userData')
      if (to.matched.some(record => record.meta.requiresAuth)) {
        next({ name: 'login' })
      } else {
        next()
      }
    }
  } else {
    next()
  }
})
