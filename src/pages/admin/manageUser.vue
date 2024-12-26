<route>
{
    path: '/admin',
    meta:{
        title: 'Admin',
        layout: 'admin'
    }
}
</route>

<script setup>
import Icon from '@/components/base/Icon.vue'
import { useAdminStore } from '@/stores/admin'
import { useDebounceFn } from '@vueuse/core'
import { useRouter } from 'vue-router'

const router = useRouter()
const adminStore = useAdminStore()

onMounted(async () => {
  await adminStore.getAllUser()
})

const paginatedUsers = computed(() => adminStore.paginatedUsers)
const totalUsers = computed(() => adminStore.totalUsers)
const itemsPerPage = ref(8)
const currentPage = computed(() => adminStore.currentPage)
const totalPages = computed(() => Math.ceil(totalUsers.value / itemsPerPage.value))

function handlePageChange(newPage) {
  if (newPage >= 1 && newPage <= totalPages.value) {
    adminStore.updatePaginatedUsers(newPage)
    adminStore.currentPage = newPage
  }
}
const searchQuery = ref('')
const debouncedSearch = useDebounceFn(async () => {
  if (searchQuery.value.trim() === '') {
    await adminStore.getAllUser()
  }
  else {
    await adminStore.searchUser(searchQuery.value)
  }
}, 500)
watch(searchQuery, () => {
  debouncedSearch()
})
</script>

<template>
  <div class="h-full flex justify-between flex-col mt-10 mb-20">
    <div class="">
      <div class="flex items-center justify-between flex-col flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 ml-2">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <Icon name="IconSearch" class="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </div>
          <input v-model="searchQuery" type="text" class="block p-2 ps-10 text-sm border rounded-lg w-80 dark:text-white bg-background  focus:outline-none focus:ring-0" placeholder="Search for users">
        </div>
      </div>
      <div class="flex flex-col">
        <div class="relative overflow-auto shadow-md ">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Role
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in paginatedUsers" :key="user.id" class="border-b">
                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <img class="w-10 h-10 rounded-full" v-lazy="user.anh_dai_dien" alt="Jese image">
                  <div class="ps-3">
                    <div class="text-base font-semibold">
                      {{ user.ten_nguoi_dung }}
                    </div>
                    <div class="font-normal text-gray-500">
                      {{ user.email }}
                    </div>
                  </div>
                </th>
                <td class="px-6 py-4">
                  {{ user.quyen }}
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2" />  {{ user.trang_thai }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <button
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    @click="router.push(`/admin/edit/${user.id}`)"
                  >
                    Edit User
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="flex justify-center items-center mt-4">
        <Icon
          name="IconPrev"
          :disabled="currentPage === 1"
          class="px-4 py-2 w-14 h-14 cursor-pointer"
          @click="handlePageChange(currentPage - 1)"
        />
        <span class="px-4">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <Icon
          name="IconPrev"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 w-14 h-14 rotate-180 cursor-pointer"
          @click="handlePageChange(currentPage + 1)"
        />
      </div>
    </div>
  </div>
</template>
