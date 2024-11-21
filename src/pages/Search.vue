<script setup>
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PlaylistHeader from '@/components/playlist/PlaylistHeader.vue';
import { useSongStore } from '@/stores/song'
const songStore = useSongStore();
const route = useRoute();
const data = ref([])
watch(() => route.query.q, async (q) => {
    const response = await songStore.searchSongs(q ?? '');
    data.value = response.data;
    console.log('watch:', data.value)
}, { immediate: true })
</script>
<template>
    <h1>
        <PlaylistHeader icon="IconMusicSolid" title="Top Result" />
    </h1>
    <div v-if="data && data.length" class="mt-4">
      <div
        v-for="song in data"
        :key="song.id"
        class="flex items-center gap-4 py-4 justify-between"
      >
        <div class="flex items-center gap-4">
          <img
            :src="song.imageUrl"
            :alt="song.title"
            class="w-10 h-10 rounded-xs object-cover"
          />
          <div>
            <h3 class="font-medium text-foreground">{{ song.title }}</h3>
            <p class="text-foreground opacity-50">{{ song.artist.name }}</p>
          </div>
        </div>
        <div>{{ song.albumName }}</div>
        <div class="w-[20%]">
            <Popover>
              <PopoverTrigger>
                <Icon name="IconEllipsis" class="w-10 h-6 text-foreground cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent class="w-25">
                <button @click="songStore.addSong(song)">Thêm vào danh sách phát</button>
              </PopoverContent>
            </Popover>
        </div>
      </div>
    </div>
</template>