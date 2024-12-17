import { apiGetSongs, getOneSong, getSongs, uploadSong } from '@/api/song'
import { toast } from '@/components/ui/toast'
import { defineStore } from 'pinia'

export const useSongStore = defineStore('queue', () => {
  const songs = ref([])
  const playlist = ref([
    {
      id: 'c1dd9254-1e26-4857-a849-cb2295877c20',
      ten_bai_hat: 'Horses (with PnB Rock, Kodak Black & A Boogie Wit da Hoodie)',
      anh: 'https://i.scdn.co/image/ab67616d0000b273a2c31c39d559355168b4cd2e',
      ten_ca_si: 'PnB Rock,Kodak Black,A Boogie Wit da Hoodie',
      the_loai: null,
      mo_ta: null,
      loi_bai_hat: null,
      thoi_luong: 249,
      lien_ket: 'https://ongakool.s3.ap-southeast-1.amazonaws.com/mp3/5de7ci7TFqbQ1PFgKAD7MR.mp3',
      trang_thai: 'hoat_dong',
      quyen_rieng_tu: 'cong_khai',
      thoi_gian_tao: '2024-12-17T03:52:52.284869',
      thoi_gian_cap_nhat: '2024-12-17T03:52:45.484122',
      thoi_gian_xoa: null,
      nguoi_dung_id: null,
      so_thu_tu: 1,
    },
    {
      id: 'd976260e-75ab-47dd-bd0e-c490d112bfe0',
      ten_bai_hat: 'Trap Paris (feat. Quavo & Ty Dolla $ign)',
      anh: 'https://i.scdn.co/image/ab67616d0000b273748388a726648841ed81027e',
      ten_ca_si: 'mgk,Quavo,Ty Dolla $ign',
      the_loai: null,
      mo_ta: null,
      loi_bai_hat: null,
      thoi_luong: 203,
      lien_ket: 'https://ongakool.s3.ap-southeast-1.amazonaws.com/mp3/5hfpu8saHLGedbHRtNCYjm.mp3',
      trang_thai: 'hoat_dong',
      quyen_rieng_tu: 'cong_khai',
      thoi_gian_tao: '2024-12-17T03:52:52.630272',
      thoi_gian_cap_nhat: '2024-12-17T03:52:45.484122',
      thoi_gian_xoa: null,
      nguoi_dung_id: null,
      so_thu_tu: 2,
    },
    {
      id: 'ba800809-d3c8-4a29-a244-418acb1e0ef3',
      ten_bai_hat: 'Kelly Price (feat. Travis Scott)',
      anh: 'https://i.scdn.co/image/ab67616d0000b273cf9b68115dcb2a222c252f00',
      ten_ca_si: 'Migos,Travis Scott',
      the_loai: null,
      mo_ta: null,
      loi_bai_hat: null,
      thoi_luong: 363,
      lien_ket: 'https://ongakool.s3.ap-southeast-1.amazonaws.com/mp3/204U3zjm9kkzX25Pr4Rdld.mp3',
      trang_thai: 'hoat_dong',
      quyen_rieng_tu: 'cong_khai',
      thoi_gian_tao: '2024-12-17T03:52:56.541263',
      thoi_gian_cap_nhat: '2024-12-17T03:52:45.484122',
      thoi_gian_xoa: null,
      nguoi_dung_id: null,
      so_thu_tu: 3,
    },
    {
      id: '1a9c8072-5bcf-49d0-9eb4-907a1d0868be',
      ten_bai_hat: 'Drinkin\' Problem',
      anh: 'https://i.scdn.co/image/ab67616d0000b27308c3459da0ec44b7e790555d',
      ten_ca_si: 'Midland',
      the_loai: null,
      mo_ta: null,
      loi_bai_hat: null,
      thoi_luong: 220,
      lien_ket: 'https://ongakool.s3.ap-southeast-1.amazonaws.com/mp3/1vBpwxsLVwaR4evBIaFmqD.mp3',
      trang_thai: 'hoat_dong',
      quyen_rieng_tu: 'cong_khai',
      thoi_gian_tao: '2024-12-17T03:52:52.244701',
      thoi_gian_cap_nhat: '2024-12-17T03:52:45.484122',
      thoi_gian_xoa: null,
      nguoi_dung_id: null,
      so_thu_tu: 4,
    },
  ])
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
    const lastIndex = playlist.value[playlist.value.length - 1].so_thu_tu
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
  async function getSongById(id) {
    const response = await getOneSong(id)
    return response
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
    songs,
    setPlaylist,
    clearPlaylist,
    fetchSongs,
    getSongById,
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
