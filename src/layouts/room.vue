<script setup>
import KeyboardShortcuts from '@/components/common/KeyboardShortcuts.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSideBar from '@/components/layout/AppSideBar.vue'
import BottomNavigationBar from '@/components/layout/BottomNavigationBar.vue'
</script>

<template>
  <div class="flex h-full">
    <div
      class="flex w-full"
    >
      <KeyboardShortcuts />
      <AppSideBar class="max-lg:hidden" />
      <div class="flex flex-col h-full w-full relative lg:[width:calc(100%-15rem)]">
        <header class="absolute left-0 top-0 w-full flex h-16 items-center">
          <AppHeader />
        </header>
        <div class="pb-20 pt-16 lg:pb-0 h-[calc(100%-2px)]">
          <router-view />
        </div>
        <BottomNavigationBar class="lg:hidden absolute bottom-0 left-4 w-[calc(100%-2rem)] z-10" />
      </div>
    </div>
  </div>
</template>
