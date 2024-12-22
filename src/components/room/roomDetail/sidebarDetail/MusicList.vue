<script setup>
import SongListItem from '@/components/common/SongListItem.vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { useRoomStore } from '@/stores/room'
import { useRoomQueue } from '@/stores/room-queue'

const props = defineProps({
  roomId: String,
})
const roomStore = useRoomStore()
const roomQueueStore = useRoomQueue()
function removeSong(id) {
  roomStore.removeSongFromQueue(id)
}
</script>

<template>
  <div class="w-full flex items-center justify-center">
    <div class="w-full flex flex-col">
      <h3 class="mx-4 mt-3 text-xl">
        Queue
      </h3>

      <ScrollArea
        class="w-full h-[30rem]"
      >
        <SongListItem
          v-for="song in roomQueueStore.playlist"
          :key="song.so_thu_tu"
          :song="song"
          :is-playing="song.so_thu_tu === roomQueueStore.currentSong.so_thu_tu"
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
                  <button @click="roomQueueStore.handleRemoveFromQueue(song)">
                    Remove from queue
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          </template>
        </SongListItem>
      </ScrollArea>
    </div>
  </div>
</template>
