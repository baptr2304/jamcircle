<script setup>
import AppSidebarAdmin from '@/components/admin/Sidebar/AppSidebarAdmin.vue'
import KeyboardShortcuts from '@/components/common/KeyboardShortcuts.vue'
import QueueDrawer from '@/components/common/QueueDrawer.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSideBar from '@/components/layout/AppSideBar.vue'
import { useUserStore } from '@/stores/user'
import { listEvents } from '@/utils/enum'
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
const userStore = useUserStore()
const role = computed(() => userStore.user?.role)
</script>

<template>
  <KeyboardShortcuts />
  <div class="flex flex-col h-full justify-between">
    <div
      class="flex w-full lg:[height:calc(100%-5.75rem)] h-[calc(100%-10rem)]"
    >
      <AppSidebarAdmin v-if="role === 'quan_tri_vien'" class="max-lg:hidden" />
      <AppSideBar v-else class="max-lg:hidden" />
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
    <footer v-if="role !== 'quan_tri_vien'" class="w-full fixed bottom-0 left-0 z-20 h-40 lg:h-[5.75rem]">
      <AppFooter :is-visible-queue-drawer="isVisibleDrawer" />
    </footer>
  </div>
</template>
