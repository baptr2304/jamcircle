<script setup>
import FooterAdmin from '@/components/admin/FooterAdmin.vue/FooterNav.vue'
import AppSidebarAdmin from '@/components/admin/Sidebar/AppSidebarAdmin.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <div
      class="flex w-full h-full"
    >
      <AppSidebarAdmin class="max-lg:hidden" />
      <div class="flex flex-col h-full w-full lg:[width:calc(100%-15rem)]">
        <header class="flex h-16 items-center">
          <AppHeader />
        </header>
        <div class="flex flex-1 flex-col gap-4 bg-muted h-[calc(100%-64px)] pb-4">
          <router-view />
        </div>
      </div>
    </div>
    <footer class="w-full fixed bottom-0 left-0 z-20 lg:hidden bg-background">
      <FooterAdmin />
    </footer>
  </div>
</template>
