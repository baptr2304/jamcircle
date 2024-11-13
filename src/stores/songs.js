// stores/song.js
import { fetchSongs } from "@/api/song";
import { defineStore } from "pinia";

export const useSongStore = defineStore("song", {
    state: () => ({
        songs: [],
    }),
    actions: {
        async fetchSongs() {
            try {
                const response = await fetchSongs();
                this.songs = response.data;
            } catch (error) {
                console.error("Error fetching songs:", error.message);
            }
        },
    },
});
