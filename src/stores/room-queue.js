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

  watch(currentRoom, handlePlaySong)

  // Song
  function nextSong() {
  }

  function prevSong() {
  }

  function handlePlaySong() {
    if (currentRoom.value.trang_thai_phat === 'dang_phat') {
      emitter.emit(listEvents.playSong)
    }
  }

  async function updateRoom(payload) {
    currentRoom.value = await apiRoom.apiUpdateRoom(payload)
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
    const data = await getPlaylistSongs(danh_sach_phat_id)
    playlist.value = data
    playlistId.value = danh_sach_phat_id
    handlePlaySong()
  }

  async function addToQueueAndPlay(song) {
    const alreadySong = await addToQueue(song)
  }

  async function playSongInQueue(song, currentTime) {
    const payload = {
      id: currentRoom.value.id,
      ten_phong: currentRoom.value.ten_phong,
      trang_thai_phat: 'dang_phat',
      thoi_gian_hien_tai_bai_hat: currentTime,
      so_thu_tu_bai_hat_dang_phat: song.so_thu_tu,
    }
    currentRoom.value = await apiRoom.apiUpdateRoom(payload)
  }

  async function pauseSongInQueue(currentTime) {
    const payload = {
      id: currentRoom.value.id,
      ten_phong: currentRoom.value.ten_phong,
      trang_thai_phat: 'tam_dung',
      thoi_gian_hien_tai_bai_hat: currentTime,
      so_thu_tu_bai_hat_dang_phat: currentRoom.value.so_thu_tu_bai_hat_dang_phat,
    }
    currentRoom.value = await apiRoom.apiUpdateRoom(payload)
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
    return data
  }

  return {
    // State
    currentRoom,
    currentSong,
    playlist,
    playlistId,
    setPlaylist,
    clearPlaylist,
    addSong,
    removeSong,
    nextSong,
    prevSong,
    playSongInQueue,
    addToQueue,
    handleRemoveFromQueue,
    addToQueueAndPlay,
    updateRoom,
    getDetailRoom,
    pauseSongInQueue,
  }
})
