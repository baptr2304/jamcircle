<script setup>
const { song, isPlaying } = defineProps({
  song: {
    type: Object,
    required: true,
  },
  isPlaying: {
    type: Boolean,
    default: false,
  },
})
defineEmits(['handleClick'])
</script>

<template>
  <div
    class="item grid grid-cols-6 justify-between items-center gap-2 hover:bg-secondary py-2 px-4 rounded-md cursor-default w-full"
    :class="{ 'text-primary': isPlaying }"
  >
    <div class="flex items-center gap-2 col-span-5">
      <slot name="start">
        <div class="w-4">
          <Icon v-if="isPlaying" name="IconChart" class="w-4 h-4" />
        </div>
      </slot>
      <div
        class="flex items-center gap-4 relative overflow-clip truncate"
      >
        <img v-lazy="song.anh" :alt="song.ten_bai_hat" class="w-10 h-10 rounded-xs object-cover">
        <div
          class="play absolute left-0 top-1 bg-card/60  bg-opacity-20 w-10 h-10 hidden items-center justify-center rounded-xs cursor-pointer"
          @click="$emit('handleClick', song.id)"
        >
          <Icon v-if="isPlaying" name="IconPlay" class="w-4 h-4" />
          <Icon v-else name="IconPause" class="w-4 h-4" />
        </div>
        <div class="w-[calc(100%-3.5rem)]">
          <h3 class="font-medium truncate">
            {{ song.ten_bai_hat }}
          </h3>
          <p class="text-foreground/80 truncate">
            {{ song.ten_ca_si }}
          </p>
        </div>
      </div>
    </div>
    <div class="col-span-1">
      <slot name="action" />
    </div>
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
