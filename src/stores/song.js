import { apiGetSongs } from "@/api/song";
import { toast } from '@/components/ui/toast';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
export const useSongStore = defineStore('queue', () => {
    const playlist = ref([
        {
            id: uuidv4(),
            title: "Chơi",
            artist: {
                id: uuidv4(),
                name: "Gerdnang",
                imageUrl: "https://static.wikia.nocookie.net/producerviet/images/c/c3/Gerdnang.jpeg",
            },
            source: "https://res.cloudinary.com/dzdfgj03g/video/upload/v1731056679/Music/Ch%C6%A1i_wpvao8.mp3",
            imageUrl: 'https://static.wikia.nocookie.net/producerviet/images/c/c3/Gerdnang.jpeg'
        },
        {
            id: uuidv4(),
            title: 'Mưa thâm lặng giời',
            artist: {
                id: uuidv4(),
                name: 'Big Daddy',
                imageUrl: "https://static.wikia.nocookie.net/producerviet/images/c/c3/Gerdnang.jpeg",
            },
            source: 'https://res.cloudinary.com/dzdfgj03g/video/upload/v1730885321/Music/y2mate.com_-_BIGDADDY_ft_GREY_D_M%C6%AFA_TH%C3%82M_L%E1%BA%B6NG_GI%E1%BB%9CI_OFFICIAL_MUSIC_VIDEO_s1xzma.mp3',
            imageUrl: "https://i.ytimg.com/vi/syp_QB-Rtf4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCn711HO2zOuCN5hJGkpMPXjpkACQ"

        }
        ,
        {
            id: uuidv4(),
            title: 'Cua',
            artist: {
                id: uuidv4(),
                name: "Gerdnang",
                imageUrl: "https://static.wikia.nocookie.net/producerviet/images/c/c3/Gerdnang.jpeg",
            },
            source: 'https://res.cloudinary.com/dzdfgj03g/video/upload/v1731049184/Music/cua_vdnwkp.mp3',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvxtSCBNrr3JsnKzx4akW64IbqSMDl-uz3CQ&s'
        },
        {
            id: uuidv4(),
            title: "When I Was Your Man",
            spotifySongId: "0z7pVBGOD7HCIB7S8eLkLI",
            imageUrl: "https://upload.wikimedia.org/wikipedia/vi/6/62/Bruno-mars-when-i-was-your-man.jpg",
            artist: {
                id: uuidv4(),
                name: "Bruno Mars",
                imageUrl: "https://thatgrapejuice.net/wp-content/uploads/2013/02/bruno-mars-when-i-was-your-man.jpg",
            },
            source: 'https://ongakool.s3.ap-southeast-1.amazonaws.com/mp3/0B7wvvmu9EISAwZnOpjhNI.mp3',
        }
    ])
    const searchResults = ref([])
    const currentSong = ref(playlist.value[0])
    const currentIndex = ref(0)
    function addSong(song) {
        const index = playlist.value.findIndex((item) => item.id === song.id)
        if (index !== -1) {
            return
        }
        playlist.value.push(song)
        toast({
            title: 'Success',
            description: 'Added to playlist'
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

    async function searchSongs(title) {
        if (!title) {
            searchResults.value = []
            return searchResults.value
        }
        try {
            const result = await apiGetSongs(title)
            searchResults.value = result
            return searchResults.value
        } catch (error) {
            console.error("Error searching songs:", error)
            return []
        }
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
    }
})