import { getUser } from '@/api/user'
import { toast } from '@/components/ui/toast'
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
      authStore.logout()
      const errorMessage = error?.response?.data?.detail || 'There was a problem with your request.'
      if (errorMessage) {
        toast({
          title: 'Error',
          description: errorMessage === 'Inactive nguoi_dung' ? 'Your account has been deactivated' : errorMessage,
          variant: 'destructive',
          duration: 5000,
        })
      }
    }
  }
  return next()
}
