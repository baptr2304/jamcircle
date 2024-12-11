// stores/song.js
import { addSongById, getOneSong, getSongs } from "@/api/song";
import { defineStore } from "pinia";
export const useSongStore = defineStore("song", () => {
    const songs = ref([]);
    async function fetchSongs() {
        try {
            const response = await getSongs();
            songs.value = response.data;
        } catch (error) {
            console.error("Error fetching songs:", error.message);
            throw error;
        }
    }
    async function getSongById(id) {
        try {
            const response = await getOneSong(id);
            return response.data;
        } catch (error) {
            console.error("Error fetching songs:", error.message)
        }
    }

    return {
        songs,
        fetchSongs,
        getSongById,

    }

});

