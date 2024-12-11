<script setup>
import PlaylistHeader from "@/components/playlist/PlaylistHeader.vue";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSongStore } from "@/stores/song";
const songStore = useSongStore();
const route = useRoute();
const data = ref([]);
watch(
  () => route.query.q,
  async (q) => {
    const response = await songStore.searchSongs(q ?? "");
    data.value = response;
    console.log("watch:", data.value);
  },
  { immediate: true }
);
</script>
<template>
  <h1>
    <PlaylistHeader icon="IconMusicSolid" title="Top Result" />
  </h1>
  <div v-if="data && data.length" class="mt-4">
    <div
      v-for="song in data"
      :key="song.id"
      class="flex items-center gap-4 py-4 justify-between px-2"
    >
      <div class="flex items-center gap-4 w-[30%]">
        <img
          :src="song.anh"
          :alt="song.ten_bai_hat"
          class="w-10 h-10 rounded-xs object-cover"
        />
        <div>
          <h3 class="font-medium text-foreground">{{ song.ten_bai_hat }}</h3>
          <p class="text-foreground opacity-50">{{ song.ten_ca_si }}</p>
        </div>
      </div>
      <div>{{ song.albumName }}</div>
      <div class="w-[20%]">
        <Popover>
          <PopoverTrigger>
            <Icon
              name="IconEllipsis"
              class="w-10 h-6 text-foreground cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverContent class="w-25">
            <button @click="songStore.addSongToPlaylist(song)">
              Thêm vào danh sách phát
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center items-center h-[50vh]">
    <p class="text-foreground opacity-50">No results found</p>
  </div>
</template>
