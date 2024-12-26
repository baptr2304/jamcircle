import {
  addSong,
  getPlaylistSongs,
  removeSong,
} from '@/api/playlist'
import * as apiRoom from '@/api/room'
import { toast } from '@/components/ui/toast'
import { listEvents } from '@/utils/enum'
import emitter from '@/utils/eventBus'
import { defineStore } from 'pinia'

export const useRoomQueue = defineStore('room-queue', () => {
  const playlist = ref([])
  const playlistId = ref(null)
  const currentRoom = ref(null)
  const currentIndex = computed(() => currentRoom.value?.so_thu_tu_bai_hat_dang_phat)
  const currentSong = computed(() => playlist.value.find(item => item.so_thu_tu === currentIndex.value))

  // Song
  async function nextSong() {
    const nextIndex = currentIndex.value + 1
    let nextSong = playlist.value.find(item => item.so_thu_tu === nextIndex)
    if (!nextSong) {
      nextSong = playlist.value[0]
    }
    await playSongInQueueRoom(nextSong, 0)
    handleLoadSong()
  }

  function prevSong() {
    const prevIndex = currentIndex.value - 1
    let prevSong = playlist.value.find(item => item.so_thu_tu === prevIndex)
    if (!prevSong) {
      prevSong = playlist.value[playlist.value.length - 1]
    }
    playSongInQueueRoom(prevSong, 0)
    handleLoadSong()
  }

  function handlePlaySong() {
    emitter.emit(listEvents.playSong)
  }

  function handleLoadSong() {
    emitter.emit(listEvents.loadSong)
    handlePlaySong()
  }

  async function updateRoom(payload) {
    currentRoom.value = await apiRoom.apiUpdateRoom(payload)
    handlePlaySong()
  }

  async function getDetailRoom(id) {
    currentRoom.value = await apiRoom.apiGetDetailRoom(id)
  }

  // Playlist
  function clearPlaylist() {
    playlist.value = []
    playlistId.value = null
    currentSong.value = null
    currentRoom.value = null
  }

  async function setPlaylist(danh_sach_phat_id) {
    playlistId.value = danh_sach_phat_id
    await fetchPlaylistSongs()
    handleLoadSong()
  }

  async function fetchPlaylistSongs() {
    if (playlistId.value) {
      playlist.value = await getPlaylistSongs(playlistId.value)
    }
  }

  async function addToQueueAndPlay(song) {
    await addToQueue(song)
    await fetchPlaylistSongs()
    const lastSong = playlist.value[playlist.value.length - 1]
    await playSongInQueueRoom(lastSong, 0)
    handleLoadSong()
  }

  async function playSongInQueueRoom(song, currentTime) {
    const payload = {
      id: currentRoom.value.id,
      ten_phong: currentRoom.value.ten_phong,
      trang_thai_phat: 'dang_phat',
      thoi_gian_hien_tai_bai_hat: currentTime,
      so_thu_tu_bai_hat_dang_phat: song.so_thu_tu,
    }
    currentRoom.value = await apiRoom.apiUpdateRoom(payload)
    handlePlaySong()
  }

  async function pauseSongInQueueRoom(currentTime) {
    const payload = {
      id: currentRoom.value.id,
      ten_phong: currentRoom.value.ten_phong,
      trang_thai_phat: 'tam_dung',
      thoi_gian_hien_tai_bai_hat: currentTime,
      so_thu_tu_bai_hat_dang_phat: currentRoom.value.so_thu_tu_bai_hat_dang_phat,
    }
    currentRoom.value = await apiRoom.apiUpdateRoom(payload)
    handlePlaySong()
  }

  async function handleRemoveFromQueue(song) {
    await removeSong(playlistId.value, song.so_thu_tu)
  }

  async function addToQueue(song) {
    const data = await addSong(playlistId.value, song.id)
    playlist.value.push(data)
    toast({
      title: 'Success',
      description: 'Added to queue',
    })
    playlist.value = await getPlaylistSongs(playlistId.value)
  }

  return {
    // State
    currentRoom,
    currentSong,
    playlist,
    playlistId,
    setPlaylist,
    fetchPlaylistSongs,
    clearPlaylist,
    handlePlaySong,
    handleLoadSong,
    addSong,
    removeSong,
    nextSong,
    prevSong,
    playSongInQueueRoom,
    addToQueue,
    handleRemoveFromQueue,
    addToQueueAndPlay,
    updateRoom,
    getDetailRoom,
    pauseSongInQueueRoom,
  }
})
