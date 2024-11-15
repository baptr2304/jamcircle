// stores/song.js
import { addSongById, getAllSongs } from "@/api/song";
import { defineStore } from "pinia";
export const useSongStore = defineStore("song", () => {
    const songs = ref([]);
    async function fetchSongs() {
        try {
            const response = await getAllSongs();
            songs.value = response.data;
        } catch (error) {
            console.error("Error fetching songs:", error.message);
            throw error; // Throw error để component có thể xử lý
        }
    }
    async function addSong(id) {
        try {
            const response = await addSongById(id);
            songs.value = response.data;
            console.log('store', songs.value);
            return response.data;
        } catch (error) {
            console.error("Error fetching songs:", error.message);

        }

    }
    return {
        songs,
        fetchSongs,
        addSong,
    }

});

