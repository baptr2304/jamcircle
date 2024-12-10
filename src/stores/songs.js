// stores/song.js
import { addSongById, getAllSongs, getOneSong, getSongs } from "@/api/song";
import { defineStore } from "pinia";
export const useSongStore = defineStore("song", () => {
    const songs = ref([]);
    const loading = ref(false);
    const hasMore = ref(true)
    const offset = ref(0)
    const limit = 10
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
    async function loadMoreSongs() {
        if (loading.value || !hasMore.value) return

        loading.value = true
        try {
            const response = await getSongs(offset.value, limit)
            songs.value = [...songs.value, ...response.data]
            offset.value += limit
            hasMore.value = response.data.length === limit
        } catch (error) {
            console.error("Error loading songs:", error)
        } finally {
            loading.value = false
        }
    }
    return {
        songs,
        fetchSongs,
        addSong,
        getSongById,
        loadMoreSongs
    }

});

