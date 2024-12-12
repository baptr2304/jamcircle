<script setup>
import { useSongStore } from '@/stores/song'

const { song } = defineProps({
  song: {
    type: Object,
    required: true,
  },
})
defineEmits(['handleClick'])
const songStore = useSongStore()
</script>

<template>
  <div class="item flex justify-between items-center gap-2 hover:bg-secondary py-2 px-4 rounded-md cursor-default">
    <div class="flex items-center gap-2">
      <slot name="start" />
      <div class="flex items-center gap-4 relative">
        <img :src="song.anh" :alt="song.ten_bai_hat" class="w-10 h-10 rounded-xs object-cover">
        <div
          class="play absolute left-0 top-1 bg-card/60  bg-opacity-20 w-10 h-10 hidden items-center justify-center rounded-xs cursor-pointer"
          @click="$emit('handleClick', song.id)"
        >
          <Icon v-if="song.id === songStore.currentSong.id" name="IconPlay" class="w-4 h-4" />
          <Icon v-else name="IconPause" class="w-4 h-4" />
        </div>
        <div class="max-w-44 w-full">
          <h3 class="font-medium truncate">
            {{ song.ten_bai_hat }}
          </h3>
          <p class="text-foreground/80 truncate">
            {{ song.ten_ca_si }}
          </p>
        </div>
      </div>
    </div>
    <slot name="action" />
  </div>
</template>

<style lang="scss" scoped>
.item {
    &:hover {
        .play {
            display: flex
        }
    }
}
</style>
