<script setup>
import KeyboardShortcuts from '@/components/common/KeyboardShortcuts.vue'
import QueueDrawer from '@/components/common/QueueDrawer.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSideBar from '@/components/layout/AppSideBar.vue'
import listEvents from '@/utils/enumEventBus'
import emitter from '@/utils/eventBus'


const isVisibleDrawer = ref(false)
function toggleOpenDrawer() {
  isVisibleDrawer.value = !isVisibleDrawer.value
}
function closeDrawer() {
  isVisibleDrawer.value = false
}
onMounted(() => {
  emitter.on(listEvents.toggleQueueDrawer, toggleOpenDrawer)
  emitter.on(listEvents.closeQueueDrawer, closeDrawer)
})
onUnmounted(() => {
  emitter.off(listEvents.toggleQueueDrawer, toggleOpenDrawer)
  emitter.off(listEvents.closeQueueDrawer, closeDrawer)
})
</script>

<template>
  <KeyboardShortcuts />
  <div class="flex flex-col h-full justify-between">
    <div
      class="flex w-full lg:[height:calc(100%-5.75rem)] h-[calc(100%-10rem)]"
    >
      <AppSideBar class="max-lg:hidden" />
      <div class="flex flex-col h-full w-full lg:[width:calc(100%-15rem)]">
        <header class="flex h-16 items-center">
          <AppHeader />
        </header>
        <div class="flex flex-1 flex-col gap-4 bg-muted h-[calc(100%-64px)] pb-4">
          <router-view />
        </div>
      </div>
    </div>
    <QueueDrawer v-model="isVisibleDrawer" />
    <footer class="w-full fixed bottom-0 left-0 z-20 h-40 lg:h-[5.75rem]">
      <AppFooter :is-visible-queue-drawer="isVisibleDrawer" />
    </footer>
  </div>
</template>
