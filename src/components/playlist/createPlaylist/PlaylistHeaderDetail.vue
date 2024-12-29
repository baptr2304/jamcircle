<script setup>
import Button from '@/components/ui/button/Button.vue'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  playlistName: {
    type: String,
    required: true,
  },
  playlistImg: {
    type: String,
    required: true,
  },
  isPlaying: {
    type: Boolean,
    default: false,
  },
})
defineEmits(['play-playlist'])
const userStore = useUserStore()
const user = userStore.user
</script>

<template>
  <div
    class="w-full md:h-[15rem] h-[8rem] xl:[15rem] flex items-center relative"
  >
    <!-- <img v-lazy="playlistImg" class=" bg-black/50 backdrop-blur-xl w-full object-cover h-full opacity-10"> -->
    <div class=" absolute top-1/2 -translate-y-1/2 left-0 w-full grid grid-cols-5">
      <div class="flex col-span-4">
        <div
          class="lg:w-[11.25rem] lg:h-[11.25rem] bg-muted flex justify-center items-center ml-4 rounded-xs z-10 w-[6rem] h-[6rem]"
        >
          <img v-if="playlistImg" v-lazy="playlistImg" class="w-full h-full rounded-xs">
        </div>
        <div class="ml-4 lg:h-[11.25rem] sm:h-[10rem] h-[6rem] flex flex-col xl:justify-between z-10 justify-around ">
          <h5>Playlist</h5>
          <div>
            <h1 class="xl:text-[4rem] font-bold cursor-pointer sm:text-[3rem] text-[1.3rem]">
              {{ props.playlistName }}
            </h1>
          </div>
          <h5 class="font-semibold">
            {{ user?.ten_nguoi_dung }}
          </h5>
        </div>
      </div>
      <Button class="w-16 h-16 rounded-full" @click="$emit('play-playlist')">
        <Icon v-if="props.isPlaying" name="IconChart" class="text-white" />
        <Icon v-else name="IconPause" class="text-white" />
      </Button>
    </div>
  </div>
</template>
