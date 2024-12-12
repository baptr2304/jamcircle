<script setup>
import QueueDrawer from '@/components/common/QueueDrawer.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSideBar from '@/components/layout/AppSideBar.vue'
import emitter from '@/utils/eventBus'

const isVisibleDrawer = ref(false)

function toggleOpenDrawer() {
  isVisibleDrawer.value = !isVisibleDrawer.value
}
function handleKeyPress(event) {
  switch (event.code) {
    case 'Space':
      event.preventDefault()
      emitter.emit('toggle-play')
      break
    case 'Escape':
      isVisibleDrawer.value = false
      break
  }
}
onMounted(() => {
  emitter.on('toggle-drawer-queue', toggleOpenDrawer)
  document.addEventListener('keydown', handleKeyPress)
})
onUnmounted(() => {
  emitter.off('toggle-drawer-queue', toggleOpenDrawer)
  document.removeEventListener('keydown', handleKeyPress)
})
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <div
      class="flex w-full lg:[height:calc(100%-5.75rem)] h-[calc(100%-10rem)]"
    >
      <AppSideBar class="max-lg:hidden" />
      <div class="flex flex-col h-full w-full lg:[width:calc(100%-15rem)]">
        <header class="flex h-16 items-center">
          <AppHeader />
        </header>
        <div class="flex flex-1 flex-col gap-4 bg-muted h-[calc(100%-64px)]">
          <router-view />
        </div>
      </div>
    </div>
    <QueueDrawer v-model="isVisibleDrawer" />
    <footer class="w-full fixed bottom-0 left-0 z-20 h-40 lg:h-[5.75rem]">
      <AppFooter />
    </footer>
  </div>
</template>
