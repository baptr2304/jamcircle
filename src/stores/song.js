import { apiGetSongs, getSongs, uploadSong } from '@/api/song'
import { toast } from '@/components/ui/toast'
import { defineStore } from 'pinia'

export const useSongStore = defineStore('queue', () => {
  const playlist = ref([])
  const searchResults = ref([])
  const currentSong = ref(playlist.value[0])
  const currentIndex = ref(0)
  // Song
  function addSong(song) {
    const index = playlist.value.findIndex(item => item.id === song.id)
    if (index !== -1) {
      return
    }
    playlist.value.push(song)
    toast({
      ten_bai_hat: 'Success',
      description: 'Added to playlist',
    })
  }
  function removeSong(index) {
    playlist.value.splice(index, 1)
  }
  function nextSong() {
    currentIndex.value++
    if (currentIndex.value >= playlist.value.length) {
      currentIndex.value = 0
    }
    currentSong.value = playlist.value[currentIndex.value]
  }
  function prevSong() {
    currentIndex.value--
    if (currentIndex.value < 0) {
      currentIndex.value = playlist.value.length - 1
    }
    currentSong.value = playlist.value[currentIndex.value]
  }

  // Playlist
  function clearPlaylist() {
    playlist.value = []
    currentIndex.value = 0
    currentSong.value = null
  }

  function setPlaylist(newPlaylist) {
    playlist.value = newPlaylist
    currentIndex.value = 0
    currentSong.value = playlist.value[currentIndex.value]
  }

  // API
  async function searchSongs(title, config = {}) {
    if (!title) {
      searchResults.value = []
      return searchResults.value
    }
    try {
      const result = await apiGetSongs(title, config)
      searchResults.value = result
      return searchResults.value
    }
    catch (error) {
      console.error('Error searching songs:', error)
      return []
    }
  }

  function playSongInQueue(song) {
    const index = playlist.value.findIndex(item => item.so_thu_tu === song.so_thu_tu)
    if (index === -1) {
      return
    }
    currentIndex.value = index
    currentSong.value = playlist.value[currentIndex.value]
  }

  function playWithoutQueue(song) {
    const alreadySong = addToQueue(song)
    playSongInQueue(alreadySong)
  }

  function handleRemoveFromQueue(song) {
    const index = playlist.value.findIndex(item => item.so_thu_tu === song.so_thu_tu)
    if (index === -1) {
      return
    }
    playlist.value.splice(index, 1)
  }

  function addToQueue(song) {
    const lastIndex = playlist.value[playlist.value.length - 1]?.so_thu_tu || 0
    const newSong = {
      ...song,
      so_thu_tu: lastIndex + 1,
    }
    playlist.value.push(newSong)
    toast({
      title: 'Success',
      description: 'Added to queue',
    })
    return newSong
  }
  async function fetchSongs() {
    return await getSongs()
  }

  async function uploadSongToServer(data) {
    return uploadSong(data)
  }

  return {
    // State
    playlist,
    currentSong,
    currentIndex,
    searchResults,
    setPlaylist,
    clearPlaylist,
    fetchSongs,
    addSong,
    removeSong,
    nextSong,
    prevSong,
    searchSongs,
    playSongInQueue,
    addToQueue,
    playWithoutQueue,
    handleRemoveFromQueue,
    uploadSongToServer,
  }
})
