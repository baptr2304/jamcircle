<script setup>
import SongListItem from '@/components/common/SongListItem.vue'
import PlaylistHeader from '@/components/playlist/PlaylistHeader.vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useSongStore } from '@/stores/song'
import { listEvents } from '@/utils/enum'
import emitter from '@/utils/eventBus'
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
function handlePlaySong(song) {
  songStore.addToQueueAndPlay(song)
  emitter.emit(listEvents.playSong)
}
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
      <SongListItem
        :song="song"
        :is-playing="song.id === songStore.currentSong?.id"
        @handle-click="handlePlaySong(song)"
      >
        <template #action>
          <div class="w-[20%]">
            <Popover>
              <PopoverTrigger>
                <Icon
                  name="IconEllipsis"
                  class="w-10 h-6  cursor-pointer"
                />
              </PopoverTrigger>
              <PopoverContent class="w-25">
                <button @click="songStore.addToQueue(song)">
                  Add to queue
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </template>
      </SongListItem>
    </div>
  </div>
  <div v-else-if="!isLoading" class="flex justify-center items-center h-[50vh]">
    <p class=" opacity-50">
      No results found
    </p>
  </div>
  <div v-show=" isLoading " class="flex w-full p-8 justify-center items-center">
    <Icon name="IconLoading" />
  </div>
</template>
