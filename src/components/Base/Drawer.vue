<script setup>
const isVisible = defineModel()
import {useUserStore} from '@/stores/user'
const userStore = useUserStore()
</script>
<template>
  <Transition name="sidebar-slide">
    <div v-if="isVisible" class="bg-card w-[21.75rem] h-full absolute p-4 right-0 top-0">
      <div class="flex justify-end items-center mr-4 mb-2 mt-2">
        <button @click="isVisible=false" class="btn-close">
          <Icon name="IconCloseBtn" class="btn-close w-8 h-8 p-2" />
        </button>
      </div>
      <slot />
    </div>
  </Transition>
</template>
<style scoped>
.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
  transition: transform 0.3s;
}

.sidebar-slide-enter-from,
.sidebar-slide-leave-to {
  transform: translateX(21.75rem);
}

.sidebar-slide-enter-to,
.sidebar-slide-leave-from {
  transform: translateX(0);
}
</style>
