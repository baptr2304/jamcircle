import {
  addSong,
  apiGetPlaylists,
  createPlaylist,
  getMy,
  getPlaylistById,
  getPlaylistSongs,
  removeSong,
  updatePlaylistName,
} from '@/api/playlist'
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const usePlaylistStore = defineStore('playlist', () => {
  const userStore = useUserStore()
  const playlists = ref(null)
  const currentPlaylist = ref(null)
  const songsPlaylist = ref(null)

  async function createNewPlaylist(ten_danh_sach_phat, firstSong = null) {
    try {
      const nguoi_dung_id = userStore.user?.id
      const anh = firstSong?.anh || null
      const response = await createPlaylist({
        ten_danh_sach_phat,
        nguoi_dung_id,
        loai: 'yeu_thich',
        anh,
      })
      return response
    }
    catch (error) {
      console.error('Error in createNewPlaylist:', error)
      throw error
    }
  }
  async function fetchDetailPlaylist(playlistId) {
    try {
      const data = await getPlaylistById(playlistId)
      return data
    }
    catch (error) {
      console.error('Error in fetchDetailPlaylist:', error)
      throw error
    }
  }
  async function fetchSongsPlaylist(playlistId) {
    try {
      const data = await getPlaylistSongs(playlistId)
      songsPlaylist.value = data
      return data
    }
    catch (error) {
      console.error('Error in fetchSongsPlaylist:', error)
      throw error
    }
  }

  async function addSongToPlaylist(playlistId, song) {
    try {
      const data = await addSong(playlistId, song.id)
      songsPlaylist.value.push(song)
      return data
    }
    catch (error) {
      console.error('Error in addSongToPlaylist:', error)
      throw error
    }
  }
  async function getMyPlaylists() {
    try {
      const data = await getMy()
      playlists.value = data
    }
    catch (error) {
      console.error('Error in getMyPlaylists:', error)
      throw error
    }
  }
  async function removeSongFromPlaylist(playlistId, index) {
    try {
      await removeSong(playlistId, index)
      songsPlaylist.value.splice(index, 1)
    }
    catch {
      console.error('Error in removeSongFromPlaylist:', error)
      throw error
    }
  }

  async function updatePlaylist(playlistId, newName) {
    try {
      const { data } = await updatePlaylistName(playlistId, { name: newName })
      const playlist = getPlaylistById(playlistId)
      if (playlist) {
        playlist.name = data.name
      }
      return data
    }
    catch (error) {
      console.error('Error in updatePlaylistName:', error)
      throw error
    }
  }

  async function getPlaylists(config) {
    return await apiGetPlaylists(config)
  }

  function setCurrentPlaylist(playlist) {
    currentPlaylist.value = playlist
  }

  function clearCurrentPlaylist() {
    currentPlaylist.value = null
  }

  function reset() {
    playlists.data = []
  }
  return {
    playlists,
    currentPlaylist,
    songsPlaylist,
    createNewPlaylist,
    fetchDetailPlaylist,
    fetchSongsPlaylist,
    addSongToPlaylist,
    getMyPlaylists,
    removeSongFromPlaylist,
    updatePlaylist,
    getPlaylists,
    setCurrentPlaylist,
    clearCurrentPlaylist,
    reset,
  }
})
