<script setup>
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import { useConfirmStore } from '@/stores/confirm'
import ErrorBoundary from './components/ErrorBoundary.vue'
import Toaster from './components/ui/toast/Toaster.vue'

const confirmStore = useConfirmStore()
const isDarkMode = ref(localStorage.getItem('dark') === 'true')

watch(isDarkMode, (value) => {
  document.body.classList.toggle('dark', value)
}, { immediate: true })
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="slide">
      <ErrorBoundary>
        <component :is="Component" />
      </ErrorBoundary>
    </transition>
  </router-view>
  <Toaster />
  <ConfirmDialog
    v-if="confirmStore.visible"
    :title="confirmStore.title"
    :message="confirmStore.message"
    @confirm="confirmStore.confirm"
    @cancel="confirmStore.cancel"
  />
</template>
