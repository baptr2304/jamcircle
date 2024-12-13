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
    class="w-full h-[15rem]  flex items-center mb-4 relative bg-cover bg-center"
  >
    <div class="absolute inset-0 bg-black/50 backdrop-blur-xl" />

    <div
      class="w-[11.25rem] h-[11.25rem] bg-muted flex justify-center items-center ml-8 rounded-xs z-10"
    >
      <img :src="playlistImg" class="w-full h-full rounded-xs">
    </div>

    <div class="ml-4 h-[11.25rem] flex flex-col justify-between z-10">
      <h5>Playlist</h5>
      <div>
        <h1 class="text-2xl md:text-[4rem] font-bold cursor-pointer text-">
          {{ props.playlistName }}
        </h1>
      </div>
      <h5 class="font-semibold">
        {{ user?.username }}
      </h5>
    </div>
  </div>
</template>
