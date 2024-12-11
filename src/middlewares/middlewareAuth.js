import { getUser } from '@/api/user'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

export async function middlewareAuth(to, from, next) {
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const accessToken = localStorage.getItem('accessToken')


  if (accessToken && !userStore.isAuthenticated) {
    try {
      const response = await getUser()
      userStore.setUser(response)
    }
    catch (error) {
      console.error('Error fetching user data:', error)
      authStore.logout()
    }
  }
  if (accessToken && userStore.isAuthenticated) {
    return next()
  }
  return next()
}
