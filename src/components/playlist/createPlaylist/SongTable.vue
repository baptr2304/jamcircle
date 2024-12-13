<script setup>
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { usePlaylistStore } from '@/stores/playlist'
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
})

const emit = defineEmits(['update:songs'])

const playlistStore = usePlaylistStore()

async function removeSong(uniqueKey) {
  try {
    const updatedSongs = props.songs.filter(
      song => song.uniqueKey !== uniqueKey,
    )
    emit('update:songs', updatedSongs)

    await playlistStore.removeSong(props.playlistId, uniqueKey)
  }
  catch (error) {
    console.error('Error removing song from playlist:', error)
  }
}
</script>

<template>
  <div v-if="songs && songs.length > 0">
    <table class="w-full text-left">
      <thead>
        <tr>
          <th>Title</th>
          <th>Album</th>
          <th>Duration</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="song in songs" :key="song.uniqueKey">
          <td class="flex items-center gap-4 my-2">
            <img
              :src="song.imageUrl"
              :alt="song.title"
              class="w-10 h-10 rounded-xs object-cover"
            >
            <div>
              <h3 class="font-medium text-foreground">
                {{ song.title }}
              </h3>
              <p class="text-foreground opacity-50">
                {{ song.artist.name }}
              </p>
            </div>
          </td>
          <td>{{ song.albumName }}</td>
          <td>{{ song.dateAdded }}</td>
          <td>
            <Popover>
              <PopoverTrigger>
                <IconEllipsis class="w-10 h-6 text-foreground cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent class="w-25">
                <button @click="removeSong(song.uniqueKey)">
                  Remove
                </button>
              </PopoverContent>
            </Popover>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <p>No songs available in this playlist.</p>
  </div>
</template>
