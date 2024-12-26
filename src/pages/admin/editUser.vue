<route>
{
  name: 'editUser',
  path: '/admin/edit/:id',
  meta: {
    title: 'Edit User',
    layout: 'admin',

  },

}
</route>

<script setup>
import ProfileForm from '@/components/layout/profile/ProfileForm.vue'
import { useAdminStore } from '@/stores/admin'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const user = ref(null)
const userId = route.params.id
const adminStore = useAdminStore()
onMounted(async () => {
  const response = await adminStore.getUserById(userId)
  user.value = response
})
</script>

<template>
  <div>
    <ProfileForm
      v-if="user"
      :user="user"
      :is-admin="true"
      context="editUser"
      :on-submit="handleUpdateUser"
    />
    <div v-else>
      Loading...
    </div>
  </div>
</template>
