<script setup>
import SongListItem from '@/components/common/SongListItem.vue'
import Input from '@/components/ui/input/Input.vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useRoomQueue } from '@/stores/room-queue'
import { useSongStore } from '@/stores/song'
import listEvents from '@/utils/enumEventBus'
import emitter from '@/utils/eventBus'

import { useAsyncState, useDebounceFn, useInfiniteScroll } from '@vueuse/core'
import { Search } from 'lucide-vue-next'

const props = defineProps({
  roomId: String,
})

const searchQuery = ref('')
const songStore = useSongStore()
const roomQueue = useRoomQueue()
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
    const response = await songStore.searchSongs(searchQuery.value, {
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
const handleSearch = useDebounceFn(async () => {
  data.value = []
  isMax.value = false
  query.value.offset = 0
  await execute()
}, 300)
function handlePlaySong(song) {
  roomQueue.playWithoutQueue(song)
  emitter.emit(listEvents.playSong)
}
</script>

<template>
  <div class="w-full flex flex-col p-2 h-full">
    <div class="relative w-[90%] max-w-sm">
      <Input
        id="search"
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        autocomplete="off"
        class="pl-10 rounded-[99px]"
        @input="handleSearch"
      />
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
      >
        <Search class="size-6 text-muted-foreground" />
      </span>
    </div>
    <div v-if="data && data.length" ref="container" class="mt-4 h-[calc(100%-5rem)] overflow-y-auto scrollbar w-[calc(100%-1rem)]">
      <div
        v-for="song in data"
        :key="song.id"
        class="flex items-center gap-4 py-4 justify-between"
      >
        <SongListItem
          :song="song"
          :is-playing="song.id === roomQueue.currentSong?.id"
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
                  <button @click="roomQueue.addToQueue(song)">
                    Add to queue
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          </template>
        </SongListItem>
      </div>
    </div>
    <div v-else-if="!isLoading" class="flex justify-center h-[50vh] pt-4">
      <p class=" opacity-50">
        No results found
      </p>
    </div>
    <div v-show=" isLoading " class="flex w-full p-8 items-center">
      <Icon name="IconLoading" />
    </div>
  </div>
</template>
