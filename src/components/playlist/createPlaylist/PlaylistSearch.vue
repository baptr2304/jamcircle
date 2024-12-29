<script setup>
import { useConfirmStore } from '@/stores/confirm'
import { useSongStore } from '@/stores/song'
import { useDebounceFn } from '@vueuse/core'
import SongsResult from './SongsResult.vue'

const props = defineProps({
  songsPlaylist: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['add-song'])
const searchQuery = ref('')
const searchResults = ref([])
const isLoading = ref(false)
const songStore = useSongStore()
const confirmStore = useConfirmStore()
async function handleSearch() {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }
  try {
    isLoading.value = true
    const songs = await songStore.searchSongs(searchQuery.value)
    searchResults.value = songs
  }
  catch (error) {
    console.error('Search error:', error)
    searchResults.value = []
  }
  finally {
    isLoading.value = false
  }
}

async function handleAddSong(song) {
  if (props.songsPlaylist.some(s => s.id === song.id)) {
    const result = await confirmStore.showConfirmDialog({
      title: 'Already added',
      message: `Do you want to add ${song.title} to your playlist any way?`,
    })
    if (!result)
      return
  }
  emit('add-song', song)
}
const debouncedSearch = useDebounceFn(() => {
  handleSearch()
}, 500)
</script>

<template>
  <div class="ml-6">
    <div class="mb-2 font-medium">
      Hãy tìm bài hát để thêm vào danh sách phát của bạn
    </div>
    <div class="relative w-full max-w-sm items-center mt-4">
      <input
        id="search"
        v-model="searchQuery"
        type="text"
        placeholder="Tìm kiếm..."
        class="flex h-10 w-[20rem] border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-card-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-10 text-white rounded-full bg-background placeholder:opacity-50"
        @input="debouncedSearch"
        @keydown.stop
      >
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center h-10 pl-4 pr-2"
      >
        <Icon name="IconSearch" class="w-4 text-muted-foreground" />
      </span>
    </div>
    <div class="mt-4 overflow-y-auto scrollbar">
      <div v-if=" isLoading " class="flex w-full p-8 justify-center items-center">
        <Icon name="IconLoading" />
      </div>
      <template v-else>
        <SongsResult
          v-if="searchResults.length > 0"
          :songs="searchResults"
          @add-song="handleAddSong"
        />
        <div
          v-else-if="searchQuery.trim() !== ''"
          class="text-center text-gray-500"
        >
          Không tìm thấy bài hát nào
        </div>
      </template>
    </div>
  </div>
</template>
