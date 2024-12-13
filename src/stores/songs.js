// stores/song.js
import { defineStore } from 'pinia'

export const useSongStore = defineStore('song', () => {
  const songs = ref([])

  return {
    songs,
    fetchSongs,
    getSongById,

  }
})
