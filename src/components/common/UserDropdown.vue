<script setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Button from '@/components/ui/button/Button.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()
const role = userStore.user?.role
const isDarkMode = ref(localStorage.getItem('dark') === 'true')
function handleChange(value) {
  isDarkMode.value = value
  localStorage.setItem('dark', value)
}
watch(
  isDarkMode,
  (value) => {
    document.body.classList.toggle('dark', value)
  },
  { immediate: true },
)
function redirectProfile() {
  nextTick(() => {
    if (router.currentRoute.value.path !== '/profile') {
      router.push('/profile')
    }
    if (role === 'quan_tri_vien') {
      router.push('/admin/profile')
    }
  })
}
function handleLogout() {
  authStore.logout()
  router.push('/')
}
const firstLetter = userStore.user?.ten_nguoi_dung
  ?.split(' ')
  .map(name => name.charAt(0))
  .join('')
  .slice(-2)
</script>

<template>
  <DropdownMenu v-if="userStore?.user">
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="relative lg:px-6 py-6 lg:w-60">
        <Avatar class="h-8 w-8 rounded-lg">
          <AvatarImage
            :src="userStore.user.anh_dai_dien"
            :alt="userStore.user.name"
          />
          <AvatarFallback class="rounded-lg">
            <span class="text-white">{{ userStore.user.anh_dai_dien || firstLetter }}</span>
          </AvatarFallback>
        </Avatar>
        <div class="max-lg:hidden grid flex-1 text-left text-sm leading-tight">
          <span class="truncate font-semibold">{{ userStore.user.ten_nguoi_dung || userStore.user.email }}</span>
        </div>
        <Icon name="IconArrowDown" class="ml-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      class="w-52 rounded-lg"
      side="bottom"
      align="end"
      :side-offset="4"
    >
      <DropdownMenuItem>
        <div class="flex justify-between item-centers w-full">
          <span>Giao diện tối</span><Switch :checked="isDarkMode" @update:checked="handleChange" />
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem v-if="role !== 'quan_tri_vien'">
        <RouterLink to="/song/create">
          Đăng bài hát
        </RouterLink>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="redirectProfile">
        Thông tin cá nhân
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="handleLogout">
        Đăng xuất
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
