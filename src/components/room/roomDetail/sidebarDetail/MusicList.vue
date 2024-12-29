<script setup>
import SongListItem from '@/components/common/SongListItem.vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useRoomQueue } from '@/stores/room-queue'

const roomQueueStore = useRoomQueue()
async function handleRemoveSong(song) {
  await roomQueueStore.handleRemoveFromQueue(song)
  await roomQueueStore.fetchPlaylistSongs()
}

async function handlePlaySong(song) {
  await roomQueueStore.playSongInQueueRoom(song, 0)
  roomQueueStore.handleLoadSong()
}
</script>

<template>
  <div class="w-full h-[calc(100%-3rem)] flex justify-center">
    <div class="w-full flex flex-col">
      <h3 class="mx-4 mt-3 py-2 text-xl">
        Hàng đợi
      </h3>

      <div
        class="w-full h-[calc(100%-3rem)] overflow-y-auto scrollbar"
      >
        <SongListItem
          v-for="song in roomQueueStore.playlist"
          :key="song.so_thu_tu"
          :song="song"
          :is-playing="song.so_thu_tu === roomQueueStore.currentSong?.so_thu_tu"
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
                  <button @click="handleRemoveSong(song)">
                    Xóa khỏi hàng đợi
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          </template>
        </SongListItem>
      </div>
    </div>
  </div>
</template>
