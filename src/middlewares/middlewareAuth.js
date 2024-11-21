import { fetchUserData } from '@/api/user'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

export async function middlewareAuth(to, from, next) {
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const accessToken = localStorage.getItem('accesstoken')

  // if (!accessToken) {
  //   userStore.removeUser()
  //   const isAuthOrErrorLayout = ['auth', 'error'].includes(to.meta.layout)
  //   return isAuthOrErrorLayout ? next() : next('/auth/login')
  // }

  if (!userStore.isAuthenticated) {
    try {
      const response = await fetchUserData()
      userStore.setUser(response.data)
    }
    catch (error) {
      console.error('Error fetching user data:', error)
      authStore.logout()
    }
  }
  return next()
}
