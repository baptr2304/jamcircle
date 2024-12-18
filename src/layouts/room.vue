<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSideBar from '@/components/layout/AppSideBar.vue'
</script>

<template>
  <div class="flex h-full">
    <div
      class="flex w-full"
    >
      <AppSideBar class="max-lg:hidden" />
      <div class="flex flex-col h-full w-full lg:[width:calc(100%-15rem)]">
        <header class="flex h-16 items-center">
          <AppHeader />
        </header>
        <router-view />
      </div>
    </div>
  </div>
</template>
