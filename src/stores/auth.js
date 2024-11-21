import { apiLogin, apiRegister } from '@/api/auth'
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('accesstoken') || '')
  const userStore = useUserStore()
  const isAuthenticated = computed(() => !!accessToken.value)
  const router = useRouter()

  function login(credentials) {

    const data = apiLogin(credentials)
    data.then((res)=>{
        localStorage.setItem("accesstoken", res.ma_xac_thuc)
        localStorage.setItem("refreshtoken", res.ma_lam_moi)
        router.push("/home")
        
     
    })
    
  }

  function logout() {
    localStorage.removeItem('accesstoken')
    userStore.removeUser()
    // router.push('/auth/login')
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
