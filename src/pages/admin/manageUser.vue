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
import EditUserModal from '@/components/admin/EditUserModal.vue'
import Icon from '@/components/base/Icon.vue'
import Button from '@/components/ui/button/Button.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { useAdminStore } from '@/stores/admin'
import { useUserStore } from '@/stores/user'
import { useDebounceFn } from '@vueuse/core'

const adminStore = useAdminStore()
const userStore = useUserStore()
const paginatedUsers = computed(() => adminStore.paginatedUsers)
const totalUsers = computed(() => adminStore.totalUsers)
const itemsPerPage = ref(8)
const modal = ref({
  isOpen: false,
  user: {},
})
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

async function save(id, role) {
  modal.value.isOpen = false
  const quyen = role === 'admin' ? 'quan_tri_vien' : 'nguoi_dung'
  await adminStore.updateRole(id, quyen)
  await adminStore.getAllUser()
}
function cancel() {
  modal.value.isOpen = false
  modal.value.user = {}
}
function editUser(user) {
  modal.value.isOpen = true
  modal.value.user = user
}

async function udpateStatusUser(id, value) {
  const status = value ? 'hoat_dong' : 'khong_hoat_dong'
  await adminStore.updateStatus(id, status)
  await adminStore.getAllUser()
}

watch(searchQuery, () => {
  debouncedSearch()
})

onMounted(async () => {
  await adminStore.getAllUser()
})
</script>

<template>
  <div class="h-full flex justify-between flex-col mt-10 mb-20">
    <div class="">
      <div class="flex items-center justify-between flex-col flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 ml-2">
        <label for="table-search" class="sr-only">Tìm kiếm</label>
        <div class="relative">
          <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <Icon name="IconSearch" class="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </div>
          <input v-model="searchQuery" type="text" class="block p-2 ps-10 text-sm border rounded-lg w-80 dark:text-white bg-background focus:outline-none focus:ring-0" placeholder="Tìm kiếm người dùng">
        </div>
      </div>
      <div class="flex flex-col">
        <div class="relative overflow-auto shadow-md scrollbar">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Tên
                </th>
                <th scope="col" class="px-6 py-3">
                  Quyền
                </th>
                <th scope="col" class="px-6 py-3">
                  Trạng thái
                </th>
                <th scope="col" class="px-6 py-3">
                  Phân quyền
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in paginatedUsers" :key="user.id" class="border-b">
                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <img v-lazy="user.anh_dai_dien" class="w-10 h-10 rounded-full" alt="Jese image">
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
                  {{ user.quyen === 'quan_tri_vien' ? 'Quản trị viên' : 'Người dùng' }}
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <Switch :checked="user.trang_thai === 'hoat_dong'" @update:checked="(value) => udpateStatusUser(user.id, value)" />
                  </div>
                </td>
                <td class="px-6 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      class="cursor-pointer"
                      as-child
                    >
                      <Button
                        :disabled="user.id === userStore?.user?.id"
                        variant="outline" class="w-24 p-0"
                      >
                        Chỉnh sửa
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem class="cursor-pointer" @click="editUser(user)">
                        Phân quyền
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="flex justify-center fixed bottom-0 left-[50%] transform ">
      <div class="flex justify-center items-center mt-4">
        <Icon
          name="IconPrev"
          :disabled="currentPage === 1"
          class="px-4 py-2 w-14 h-14 cursor-pointer"
          @click="handlePageChange(currentPage - 1)"
        />
        <span class="px-4">
          Trang {{ currentPage }} / {{ totalPages }}
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
  <EditUserModal
    v-if="modal.isOpen"
    :user="modal.user"
    @cancel="cancel"
    @save="save"
  />
</template>
