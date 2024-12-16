<script setup>
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
})
const userStore = useUserStore()
const user = userStore.user
</script>

<template>
  <div
    class="w-full md:h-[15rem] h-[8rem] xl:[15rem] flex items-center relative bg-cover bg-center"
  >
    <div class="absolute inset-0 bg-black/50 backdrop-blur-xl" />

    <div
      class="lg:w-[11.25rem] lg:h-[11.25rem] bg-muted flex justify-center items-center ml-4 rounded-xs z-10 sm:w-[10rem] sm:h-[10rem] w-[6rem] h-[6rem]"
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
        {{ user?.username }}
      </h5>
    </div>
  </div>
</template>
