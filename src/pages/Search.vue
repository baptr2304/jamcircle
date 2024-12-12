<script setup>
import PlaylistHeader from '@/components/playlist/PlaylistHeader.vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useSongStore } from '@/stores/song'
import { useAsyncState, useInfiniteScroll } from '@vueuse/core'

const songStore = useSongStore()
const route = useRoute()
const data = ref([])
const query = ref({
  offset: 0,
  limit: 10,
})
const container = ref(null)
const isMax = ref(false)
const { isLoading, execute } = useAsyncState(
  async () => {
    if (isMax.value)
      return
    const response = await songStore.searchSongs(route.query.q ?? '', {
      params: query.value,
    })
    if (response.length < query.value.limit) {
      isMax.value = true
    }
    data.value.push(...response)
  },
  { id: null },
)
useInfiniteScroll(
  container,
  async () => {
    query.value.offset += query.value.limit
    await execute()
  },
  { distance: 0 },
)
watch(
  () => route.query.q,
  async () => {
    data.value = []
    isMax.value = false
    query.value.offset = 0
    await execute()
  },
)
</script>

<template>
  <h1>
    <PlaylistHeader icon="IconMusicSolid" title="Top Result" />
  </h1>
  <div v-if="data && data.length" ref="container" class="mt-4 px-2 overflow-y-auto scrollbar w-[calc(100%-1rem)]">
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
        >
        <div>
          <h3 class="font-medium text-foreground">
            {{ song.ten_bai_hat }}
          </h3>
          <p class="text-foreground opacity-50">
            {{ song.ten_ca_si }}
          </p>
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
  <div v-else-if="!isLoading" class="flex justify-center items-center h-[50vh]">
    <p class="text-foreground opacity-50">
      No results found
    </p>
  </div>
  <div v-show=" isLoading " class="flex w-full p-8 justify-center items-center">
    <Icon name="IconLoading" />
  </div>
</template>
