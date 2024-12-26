<route>
    {
      name: 'AdminProfile',
      path: '/admin/profile',
      meta: {
        title: 'Edit User',
        layout: 'admin',
      },
    }
    </route>

<script setup>
import ProfileForm from '@/components/layout/profile/ProfileForm.vue'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'

const userStore = useUserStore()
onMounted(() => {
  userStore.getUserAuth()
})

const user = userStore.user
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full">
    <ProfileForm
      :user="user"
      :is-admin="true"
      context="admin"
      :on-submit="handleUpdateUser"
    />
  </div>
</template>
