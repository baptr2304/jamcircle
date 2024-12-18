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
      <div class="flex-1 overflow-y-auto">
        <slot />
      </div>
      <!-- <div class="control-bar">
        <div class="flex items-center gap-4 max-lg:hidden">
          <Icon
            name="IconBackward"
            class="icon-button"
            @click="seekBackward"
          />
          <Icon name="IconPrevious" class="icon-button" @click="prevSong" />
          <button class="button-play" @click="handlePlay">
            <Icon
              v-if="isPlaying"
              name="IconPlay"
              class="cursor-pointer w-4 h-4"
            />
            <Icon v-else name="IconPause" class="cursor-pointer w-4 h-4" />
          </button>
          <Icon name="IconNext" class="icon-button" @click="nextSong" />
          <Icon
            name="IconForward"
            class="icon-button"
            @click="seekForward"
          />
        </div>
        <div class="flex gap-4 justify-center w-full">
          <span class="w-14 text-center max-lg:hidden">{{
            formatTime(songCurrentTime)
          }}</span>
          <div
            ref="progressBar"
            class="flex items-center justify-center gap-2 w-full lg:w-96 cursor-pointer"
            @mousedown="handleMouseDown"
          >
            <Progress v-model="progress" class="w-full" />
          </div>
          <span class="w-14 text-center max-lg:hidden">{{
            formatTime(songDuration)
          }}</span>
        </div>

        <div
          class="lg:hidden flex items-center h-10 gap-2.5 absolute left-4 top-2"
        >
          <img
            :src="songStore.currentSong.anh"
            alt=""
            class="w-10 h-10 rounded-lg object-cover"
          >
          <div class="song-meta w-full max-w-32">
            <p class="title text-sm truncate font-semibold">
              {{ songStore.currentSong.ten_bai_hat }}
            </p>
            <p class="artist text-xs truncate text-secondary-foreground">
              {{ songStore.currentSong.ten_ca_si }}
            </p>
          </div>
        </div>
        <Icon
          name="IconQueue"
          class="w-8 h-8 p-1 lg:hidden cursor-pointer absolute top-1/2 right-[9rem] transform -translate-y-1/2"
          :class="{ 'text-primary': props.isVisibleQueueDrawer }"
          @click="toggleOpenDrawer"
        />

        <div class="flex items-center gap-4 absolute right-8 top-4 lg:hidden">
          <Icon name="IconPrevious" class="icon-button" @click="prevSong" />
          <button class="button-play" @click="handlePlay">
            <Icon
              v-if="isPlaying"
              name="IconPlay"
              class="cursor-pointer w-4 h-4"
            />
            <Icon v-else name="IconPause" class="cursor-pointer w-4 h-4" />
          </button>
          <Icon name="IconNext" class="icon-button" @click="nextSong" />
        </div>
      </div> -->
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
