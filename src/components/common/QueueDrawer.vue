<script setup>
import Drawer from '@/components/base/Drawer.vue'
import SongListItem from '@/components/common/SongListItem.vue'
import { useSongStore } from '@/stores/song'
import emitter from '@/utils/eventBus'

const songStore = useSongStore()
const isVisible = defineModel()

function handlePlaySong(id) {
  songStore.playSong(id)
  emitter.emit('play-song')
}
</script>

<template>
  <Drawer v-model="isVisible">
    <div class="p-2 w-full">
      <h1 class="text-2xl font-bold">
        Queue
      </h1>
      <div class="grid gap-4 mt-4 h-full max-h-[calc(100%-2rem)] overflow-y-auto scrollbar pb-44 lg:pb-24">
        <SongListItem v-for="song in songStore.playlist" :key="song.id" :song="song" :class="{ 'text-primary': song.id === songStore.currentSong.id }" @handle-click="handlePlaySong(song.id)">
          <template #start>
            <div class="w-4">
              <Icon v-if="song.id === songStore.currentSong.id" name="IconChart" class="w-4 h-4" />
              <span v-else>{{ song.so_thu_tu }}</span>
            </div>
          </template>
        </SongListItem>
      </div>
    </div>
  </Drawer>
</template>
