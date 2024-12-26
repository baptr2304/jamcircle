import { apiLogin, apiRegister } from '@/api/auth'
import { defineStore } from 'pinia'

import { useUserStore } from './user'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('accessToken') || '')
  const userStore = useUserStore()
  const isAuthenticated = computed(() => !!accessToken.value)
  const router = useRouter()

  async function login(credentials) {
    const userRole = userStore.user?.role
    const data = await apiLogin(credentials)
    localStorage.setItem('accessToken', data.ma_xac_thuc)
    localStorage.setItem('refreshToken', data.ma_lam_moi)
    if (userRole === 'quan_tri_vien') {
  
      return router.push('/admin')
    }
    else {
      return router.push('/')
    }
  }

  async function logout() {
    localStorage.removeItem('accessToken')
    userStore.removeUser()
    accessToken.value = ''
  }

  function register(credentials) {
    return apiRegister(credentials)
  }

  return {
    isAuthenticated,
    login,
    logout,
    register,
  }
})
