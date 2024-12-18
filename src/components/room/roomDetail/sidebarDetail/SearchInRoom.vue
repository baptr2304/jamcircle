<script setup>
import IconEllipsis from '@/components/icons/IconEllipsis.vue'
import Input from '@/components/ui/input/Input.vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { useConfirmStore } from '@/stores/confirm'
import { useRoomStore } from '@/stores/room'
import { useSongStore } from '@/stores/song'
import { Search } from 'lucide-vue-next'

const props = defineProps({
  roomId: String,
  listSongs: Array,
})

const confirmStore = useConfirmStore()
const searchQuery = ref('')
const songs = useSongStore()
const roomStore = useRoomStore()
const allSongs = computed(() => songs.songs)
const filteredSongs = computed(() => {
  if (!searchQuery.value.trim()) {
    return []
  }
  return allSongs.value.filter(song =>
    song.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})
onMounted(async () => {
  try {
    await songs.fetchSongs()
  }
  catch (err) {
    console.error(err)
  }
})
const selectedSong = ref(null)
async function addSongToQueue(songId) {
  const isDuplicate = props.listSongs.some(s => s.id === songId)
  if (isDuplicate) {
    const song = allSongs.value.find(s => s.id === songId)
    selectedSong.value = song
    const result = await confirmStore.showConfirmDialog({
      title: 'Already added',
      message: `Do you want to add ${song.title} to your playlist any way?`,
    })
    if (!result) {
      return
    }
  }
  try {
    await roomStore.addSongToRoomPlaylist(props.roomId, songId)
    searchQuery.value = ''
  }
  catch {
    console.error(err)
  }
}
</script>

<template>
  <div class="w-full flex justify-center flex-col">
    <div class="relative w-[90%] max-w-sm mt-2">
      <Input
        id="search"
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        class="pl-10 rounded-[99px]"
      />
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
      >
        <Search class="size-6 text-muted-foreground" />
      </span>
    </div>
    <ScrollArea
      v-if="filteredSongs && filteredSongs.length > 0"
      type="text"
      class="w-full h-36 mt-2"
    >
      <div class="flex flex-col gap-2 w-full">
        <div
          v-for="song in filteredSongs"
          :key="song.id"
          class="flex gap-2 py-4 mx-4 justify-between"
        >
          <div class="flex gap-2">
            <img
              v-lazy="song.imageUrl"
              :alt="song.title"
              class="w-8 h-8 rounded-xs object-cover"
            >
            <div>
              <h3 class="font-normal text-sm truncate">
                {{ song.title }}
              </h3>
              <p class="text-xs opacity-50">
                {{ song.artist.name }}
              </p>
            </div>
          </div>
          <div>{{ song.albumName }}</div>
          <Popover>
            <PopoverTrigger>
              <IconEllipsis class="w-6 h-6 text-foreground cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent class="w-25">
              <button @click="addSongToQueue(song.id)">
                Add song
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </ScrollArea>
  </div>
</template>
