import { fetchUserData } from '@/api/user'
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  function setUser(newUser) {
    user.value = newUser
  }
  async function fetchUser() {
    try {
      const response = await fetchUserData()
      setUser(response.data)
      console.log('User data fetched:', response.data)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }
  function removeUser() {
    user.value = null
  }
  function updateUser(updates) {
    if (user.value) {
      user.value = { ...user.value, ...updates }
    }
  }
  const isAuthenticated = computed(() => !!user.value)
  return {
    user,
    setUser,
    isAuthenticated,
    removeUser,
    updateUser,
    fetchUser,
  }
})
