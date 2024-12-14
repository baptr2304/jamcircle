<script setup>
import SongListItem from '@/components/common/SongListItem.vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { usePlaylistStore } from '@/stores/playlist'
import { useSongStore } from '@/stores/song'
import { useUserStore } from '@/stores/user'
import IconEllipsis from '../../icons/IconEllipsis.vue'

const props = defineProps({
  songs: {
    type: Array,
    default: () => [],
  },
  playlistId: {
    type: String,
    required: true,
  },
  currentPlaylistOwner: {
    type: String,
    required: true,
  },
})
const songStore = useSongStore()
const playlistStore = usePlaylistStore()
async function removeSong(index) {
  await playlistStore.removeSongFromPlaylist(props.playlistId, index)
}
const userStore = useUserStore()
const user = userStore.user
// async function addSongToQueue(song) {
//   console.log('addSongToQueue', song)
// }
function handlePlaySong(song) {
  songStore.playWithoutQueue(song)
  emitter.emit(listEvents.playSong)
}
</script>

<template>
  <div v-if=" songs.length > 0" class="overflow-y-auto max-h-40 scrollbar ">
    <div class="w-full text-left">
      <div v-for="(song, index) in songs" :key="index">
        <div class="flex items-center gap-4 my-2 hover:bg-secondary rounded-xl">
          <SongListItem
            :song="song" :class="{ 'text-primary': song.id === songStore.currentSong?.id }"
            @handle-click="handlePlaySong(song)"
          >
            <template #start>
              <div class="w-4">
                <IconChart v-if="song.id === songStore.currentSong?.id" class="w-4 h-4" />
              </div>
            </template>
            <template #action>
              <div v-if="user?.id === currentPlaylistOwner">
                <Popover>
                  <PopoverTrigger>
                    <IconEllipsis class="w-4 h-4 text-foreground cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent class="w-25 flex flex-col">
                    <button class="mb-2 " @click="songStore.addToQueue(song)">
                      Add to queue
                    </button>
                    <hr class="border-1">
                    <button @click="removeSong(index)">
                      Remove
                    </button>
                  </PopoverContent>
                </Popover>
              </div>
              <div v-else>
                <Popover>
                  <PopoverTrigger>
                    <IconEllipsis class="w-10 h-6 text-foreground cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent class="w-25">
                    <button @click="addSongToQueue(song.id)">
                      Add to queue
                    </button>
                  </PopoverContent>
                </Popover>
              </div>
            </template>
          </SongListItem>
        </div>
      </div>
    </div>
  </div>
</template>
