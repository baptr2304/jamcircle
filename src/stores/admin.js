import { apiGetAllUsers, apiGetUserById, apiSearch } from '@/api/admin'
import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', () => {
  const allUsers = ref([])
  const paginatedUsers = ref([])
  const currentPage = ref(1)
  const totalUsers = computed(() => allUsers.value.length)
  const currentUser = ref(null)
  async function getAllUser() {
    const response = await apiGetAllUsers()
    allUsers.value = response
    updatePaginatedUsers(1)
  }
  function updatePaginatedUsers(page, itemPerPage = 8) {
    const startIndex = (page - 1) * itemPerPage
    const endIndex = startIndex + itemPerPage
    paginatedUsers.value = allUsers.value.slice(startIndex, endIndex)
  }
  async function searchUser(username) {
    if (!username) {
      paginatedUsers.value = []
      return paginatedUsers.value
    }
    try {
      const result = await apiSearch(username)
      paginatedUsers.value = result
      return paginatedUsers.value
    }
    catch (error) {
      console.error(error)
      return []
    }
  }
  async function getUserById(id) {
    try {
      const response = await apiGetUserById(id)
      currentUser.value = response
      console.log('currentUser:', currentUser.value)
      return response
    }
    catch (error) {
      console.error('Error fetching user data:', error)
    }
  }
  return {
    allUsers,
    paginatedUsers,
    currentPage,
    totalUsers,
    getAllUser,
    updatePaginatedUsers,
    searchUser,
    getUserById,
  }
})
