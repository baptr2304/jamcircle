<script setup>
import PlaylistSearch from '@/components/playlist/createPlaylist/PlaylistSearch.vue'
import { usePlaylistStore } from '@/stores/playlist'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'vue-router'

const randomId = () => uuidv4().slice(0, 5)
const playlistStore = usePlaylistStore()
const router = useRouter()

async function addToPlaylist(song) {
  try {
    const defaultName = `My playlist #${randomId()}`
    const response = await playlistStore.createNewPlaylist(defaultName, song)
    const playlistId = response?.id
    if (!playlistId) {
      throw new Error('Failed to create playlist - no ID returned')
    }
    const playlistPath = `/playlist/${playlistId}`
    router.push(playlistPath)
    await playlistStore.addSongToPlaylist(playlistId, song)
  }
  catch (error) {
    console.error('Error in addToPlaylist:', error)
  }
}
</script>

<template>
  <div class="mt-4">
    <PlaylistSearch @add-song="addToPlaylist"/>
  </div>
</template>
