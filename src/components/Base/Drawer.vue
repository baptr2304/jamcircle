<script setup>
const isVisible = defineModel()
</script>

<template>
  <Transition name="sidebar-slide">
    <div v-if="isVisible" class="bg-card sm:w-[21.75rem] w-full h-full fixed p-4 right-0 top-0 z-10">
      <div class="flex justify-end items-center my-2 mt-2">
        <button class="btn-close" @click="isVisible = false">
          <Icon name="IconCloseBtn" class="btn-close w-8 h-8 p-2" />
        </button>
      </div>
      <div class="flex-1 overflow-y-auto h-[calc(100%-5rem)] w-full scrollbar">
        <slot />
      </div>
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
