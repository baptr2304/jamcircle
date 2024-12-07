// stores/song.js
import { addSongById, getAllSongs, getOneSong } from "@/api/song";
import { defineStore } from "pinia";
export const useSongStore = defineStore("song", () => {
    const songs = ref([]);
    async function fetchSongs() {
        try {
            const response = await getAllSongs();
            songs.value = response.data;
        } catch (error) {
            console.error("Error fetching songs:", error.message);
            throw error;
        }
    }
    async function addSong(id) {
        try {
            const response = await addSongById(id);
            songs.value = response.data;
            return response.data;
        } catch (error) {
            console.error("Error fetching songs:", error.message);

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
        addSong,
        getSongById
    }

});

