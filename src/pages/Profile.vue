<script setup>
import ProfileForm from '@/components/layout/profile/ProfileForm.vue'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'

const userStore = useUserStore()
onMounted(() => {
  userStore.getUserAuth()
})
async function handleUpdateUser(user) {
  await userStore.updateUser(user)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full">
    <ProfileForm
      :user="userStore.user"
      :is-admin="false"
      context="self"
      :on-submit="handleUpdateUser"
    />
  </div>
</template>
