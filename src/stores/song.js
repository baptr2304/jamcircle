import { apiGetSongs } from '@/api/song'
import { toast } from '@/components/ui/toast'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const useSongStore = defineStore('queue', () => {
  const playlist = ref([
    {
      id: uuidv4(),
      ten_bai_hat: 'Chơi',
      ten_ca_si: 'Gerdnang',
      lien_ket: 'https://res.cloudinary.com/dzdfgj03g/video/upload/v1731056679/Music/Ch%C6%A1i_wpvao8.mp3',
      anh: 'https://static.wikia.nocookie.net/producerviet/images/c/c3/Gerdnang.jpeg',
      thoi_luong: '250',
      so_thu_tu: 1,
    },
    {
      id: uuidv4(),
      ten_bai_hat: 'Mưa thâm lặng giời',
      ten_ca_si: 'Big Daddy',
      lien_ket: 'https://res.cloudinary.com/dzdfgj03g/video/upload/v1730885321/Music/y2mate.com_-_BIGDADDY_ft_GREY_D_M%C6%AFA_TH%C3%82M_L%E1%BA%B6NG_GI%E1%BB%9CI_OFFICIAL_MUSIC_VIDEO_s1xzma.mp3',
      anh: 'https://i.ytimg.com/vi/syp_QB-Rtf4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCn711HO2zOuCN5hJGkpMPXjpkACQ',
      thoi_luong: '250',
      so_thu_tu: 2,

    },
    {
      id: uuidv4(),
      ten_bai_hat: 'Cua',
      ten_ca_si: 'Gerdnang',
      lien_ket: 'https://res.cloudinary.com/dzdfgj03g/video/upload/v1731049184/Music/cua_vdnwkp.mp3',
      anh: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvxtSCBNrr3JsnKzx4akW64IbqSMDl-uz3CQ&s',
      thoi_luong: '250',
      so_thu_tu: 3,
    },
    {
      id: uuidv4(),
      ten_bai_hat: 'When I Was Your Man',
      spotifySongId: '0z7pVBGOD7HCIB7S8eLkLI',
      anh: 'https://upload.wikimedia.org/wikipedia/vi/6/62/Bruno-mars-when-i-was-your-man.jpg',
      thoi_luong: '250',
      so_thu_tu: 4,
      ten_ca_si: 'Bruno Mars',
      lien_ket: 'https://ongakool.s3.ap-southeast-1.amazonaws.com/mp3/0B7wvvmu9EISAwZnOpjhNI.mp3',
    },
  ])
  const searchResults = ref([])
  const currentSong = ref(playlist.value[0])
  const currentIndex = ref(0)
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
  return {
    playlist,
    currentSong,
    currentIndex,
    searchResults,
    addSong,
    removeSong,
    nextSong,
    prevSong,
    searchSongs,
    playSongInQueue,
    addToQueue,
    playWithoutQueue,
    handleRemoveFromQueue,
  }
})
