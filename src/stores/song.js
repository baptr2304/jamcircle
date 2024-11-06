import { defineStore } from 'pinia'

export const useSongStore = defineStore('song', () => {
    const song = ref(null)

    function setSong(newSong) {
        song.value = newSong
    }
    function removeSong() {
        song.value = null
    }
    function changeCurrentTime(time, type) {
        switch (type) {
            case "backward":
                song.value.currentTime -= time;
                break;
            case "forward":
                song.value.currentTime += time;
                break;

            default:
                song.value.currentTime = time;
                break;
        }
    }
    const isPlaying = computed(() => !!song.value)
    return {
        song,
        setSong,
        isPlaying,
        removeSong,
        changeCurrentTime
    }
})