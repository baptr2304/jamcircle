<script setup>
import PlaylistSearch from "@/components/playlist/createPlaylist/PlaylistSearch.vue";
import router from "@/router";
import { usePlaylistStore } from "@/stores/playlist";
import { useSongStore } from "@/stores/songs";
import { onMounted } from "vue";

const playlistStore = usePlaylistStore();
const songStore = useSongStore();

onMounted(async () => {
    await songStore.fetchSongs();
});

const addToPlaylist = async (song) => {
    try {
        // 1. Tạo playlist mới và lưu response
        const data = await playlistStore.createNewPlaylist("My playlist");
        if (!data || !data.id) {
            throw new Error("Failed to create playlist - no ID returned");
        }

        // 2. Thêm bài hát vào playlist
        await playlistStore.addSong(data.id, song);

        // // 4. Chuyển hướng đến trang chi tiết playlist
        const playlistPath = `/playlist/playlistDetail/${data.id}`;
        console.log("Redirecting to:", playlistPath); // Debug log
        await router.push(playlistPath);
    } catch (error) {
        console.error("Error in addToPlaylist:", error);
    }
};
</script>

<template>
    <div>
    
        <PlaylistSearch :songs="songStore.songs" @add-song="addToPlaylist" />
    
    </div>
</template>
