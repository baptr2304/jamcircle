<script setup>
import SongListItem from '@/components/common/SongListItem.vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import Separator from '@/components/ui/separator/Separator.vue'
import { usePlaylistStore } from '@/stores/playlist'
import { useSongStore } from '@/stores/song'
import { useUserStore } from '@/stores/user'
import listEvents from '@/utils/enumEventBus'
import emitter from '@/utils/eventBus'
// async function addSongToQueue(song) {
//   console.log('addSongToQueue', song)
import { formatTime } from '@/utils/format'
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
// }
function handlePlaySong(song) {
  songStore.playWithoutQueue(song)
  emitter.emit(listEvents.playSong)
}
</script>

<template>
  <div v-if=" songs.length > 0">
    <div class="w-full text-left pr-2">
      <div class="grid grid-cols-4 sm:grid-cols-6 gap-4 py-4 text-md text-muted-foreground pr-2.5">
        <div class="col-span-3 pl-10">
          # Title
        </div>
        <span class="text-center max-sm:hidden">
          Date added
        </span>
        <span class="text-center max-sm:hidden">
          Duration
        </span>
        <span class="text-center">
          Action
        </span>
      </div>
      <Separator class="bg-muted-foreground/50 mb-4" />
      <div class="overflow-y-auto max-h-56 scrollbar ">
        <div v-for="(song, index) in songs" :key="song.id">
          <div class="grid grid-cols-4 sm:grid-cols-6 gap-4 my-2 hover:bg-secondary rounded-xl">
            <div class="col-span-3">
              <SongListItem
                :song="song"
                :is-playing="song.id === songStore.currentSong?.id"
                @handle-click="handlePlaySong(song)"
              />
            </div>
            <div class="items-center justify-center hidden sm:flex">
              {{ String(song.thoi_gian_tao).split('T')[0] }}
            </div>
            <div class="items-center justify-center hidden sm:flex">
              {{ formatTime(song.thoi_luong) }}
            </div>

            <div class="flex items-center justify-center" v-if="user?.id === currentPlaylistOwner">
              <Popover>
                <PopoverTrigger>
                  <IconEllipsis class="w-9 h-9 text-foreground cursor-pointer ml-1 p-2 hover:bg-muted rounded-sm" />
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
                  <IconEllipsis class="w-10 h-10 text-foreground cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent class="w-25">
                  <button @click="addSongToQueue(song.id)">
                    Add to queue
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
