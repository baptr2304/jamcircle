<script setup>
import Drawer from '@/components/base/Drawer.vue'
import SongListItem from '@/components/common/SongListItem.vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useSongStore } from '@/stores/song'
import listEvents from '@/utils/enumEventBus'

import emitter from '@/utils/eventBus'

const songStore = useSongStore()
const isVisible = defineModel()

function handlePlaySong(song) {
  songStore.playSongInQueue(song)
  emitter.emit(listEvents.playSong)
}
</script>

<template>
  <Drawer v-model="isVisible">
    <div class="p-2 w-full">
      <h1 class="text-2xl font-bold">
        Queue
      </h1>
      <div class="grid gap-4 mt-4 h-full max-h-[calc(100%-2rem)] overflow-y-auto scrollbar pb-44 lg:pb-24 pr-4">
        <SongListItem v-for="song in songStore.playlist" :key="song.so_thu_tu" :song="song" :class="{ 'text-primary': song.so_thu_tu === songStore.currentSong.so_thu_tu }" @handle-click="handlePlaySong(song)">
          <template #start>
            <div class="w-4">
              <Icon v-if="song.so_thu_tu === songStore.currentSong.so_thu_tu" name="IconChart" class="w-4 h-4" />
              <span v-else>{{ song.so_thu_tu }}</span>
            </div>
          </template>
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
                  <button @click="songStore.handleRemoveFromQueue(song)">
                    Remove from queue
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          </template>
        </SongListItem>
      </div>
    </div>
  </Drawer>
</template>
