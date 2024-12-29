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
      const errorMessage = error?.response?.data?.detail || 'Có lỗi xảy ra'
      if (errorMessage) {
        toast({
          title: 'Lỗi',
          description: errorMessage === 'Inactive nguoi_dung' ? 'Tài khoản của bạn đã bị vô hiệu hóa' : errorMessage,
          variant: 'destructive',
          duration: 5000,
        })
      }
    }
  }
  return next()
}
