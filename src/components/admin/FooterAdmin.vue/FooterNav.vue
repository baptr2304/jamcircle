<script setup>
import AppSideBarItem from '@/components/layout/SideBar/AppSideBarItem.vue'

const data = ref([
  {
    id: 1,
    icon: 'IconUser',
    title: 'User',
    url: '/admin',

  },
  {
    id: 2,
    icon: 'IconChart',
    title: 'Statistics',
    url: '/admin/statistics',
    content: 'Login to view your playlist',
    requiredAuthen: true,
  },

])
</script>

<template>
  <div class="flex justify-around h-20 ">
    <AppSideBarItem
      v-for="item in data"
      :key="item.id"
      v-bind="item"
      text-style="text-xs text-center font-normal"
      class="flex-col item"
    />
  </div>
</template>

<style scoped>
.item {
  padding: 0.25rem 0.5rem;
}
</style>
