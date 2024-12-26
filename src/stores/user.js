import { getUser, update } from '@/api/user'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  function setUser(newUser) {
    user.value = newUser
  }

  async function getUserAuth() {
    try {
      const response = await getUser()
      setUser(response)
    }
    catch (error) {
      console.error('Error fetching user data:', error)
    }
  }
  function removeUser() {
    user.value = null
  }

  async function updateUser(updates) {
    try {
      const { avatar, username } = updates
      const payload = {
        anh_dai_dien: avatar,
        ten_nguoi_dung: username,
      }
      const response = await update(payload)
      setUser(response)
      return response
    }
    catch (error) {
      console.error('Error updating user data:', error)
    }
  }
  const isAuthenticated = computed(() => !!user.value)

  return {
    user,
    setUser,
    isAuthenticated,
    removeUser,
    updateUser,
    getUserAuth,
  }
})
