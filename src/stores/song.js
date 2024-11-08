import { defineStore } from 'pinia'

export const useSongStore = defineStore('queue', () => {
    const playlist = ref([
        {
            id:0,
            name:"Chơi",
            singer:"Gerdnang",
            source:"https://res.cloudinary.com/dzdfgj03g/video/upload/v1731056679/Music/Ch%C6%A1i_wpvao8.mp3",
            thumbnail: 'https://static.wikia.nocookie.net/producerviet/images/c/c3/Gerdnang.jpeg'
        },
        {
            id: 1,
            name: 'Mưa thâm lặng giời',
            singer: 'Big Daddy',
            source: 'https://res.cloudinary.com/dzdfgj03g/video/upload/v1730885321/Music/y2mate.com_-_BIGDADDY_ft_GREY_D_M%C6%AFA_TH%C3%82M_L%E1%BA%B6NG_GI%E1%BB%9CI_OFFICIAL_MUSIC_VIDEO_s1xzma.mp3',
            thumbnail:"https://i.ytimg.com/vi/syp_QB-Rtf4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCn711HO2zOuCN5hJGkpMPXjpkACQ"

        }
        , {
            id: 2,
            name: 'Cua',
            singer: 'Gerdnang',
            source: 'https://res.cloudinary.com/dzdfgj03g/video/upload/v1731049184/Music/cua_vdnwkp.mp3',
            thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvxtSCBNrr3JsnKzx4akW64IbqSMDl-uz3CQ&s'
        }
    ])
    const currentSong = ref(playlist.value[0])
    const currentIndex = ref(0)
    function addSong(song) {
        playlist.value.push(song)
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
    return {
        playlist,
        currentSong,
        currentIndex,
        addSong,
        removeSong,
        nextSong,
        prevSong,
    }
})