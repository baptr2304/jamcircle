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
</script>

<template>
  <DropdownMenu v-if="userStore?.user">
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="relative lg:px-6 py-6 lg:w-60">
        <Avatar class="h-8 w-8 rounded-lg">
          <AvatarImage
            :src="userStore.user.avatar"
            :alt="userStore.user.name"
          />
          <AvatarFallback class="rounded-lg">
            CN
          </AvatarFallback>
        </Avatar>
        <div class="max-lg:hidden grid flex-1 text-left text-sm leading-tight">
          <span class="truncate font-semibold">{{ userStore.user.username || userStore.user.email }}</span>
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
          <span>Dark mode</span><Switch :checked="isDarkMode" @update:checked="handleChange" />
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem v-if="role !== 'quan_tri_vien'">
        <RouterLink to="/song/create">
          Create Song
        </RouterLink>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="redirectProfile">
        Profile
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="handleLogout">
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
