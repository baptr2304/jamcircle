<script setup>
import PlaylistSearch from "@/components/playlist/createPlaylist/PlaylistSearch.vue";
import { usePlaylistStore } from "@/stores/playlist";
import { useRouter } from "vue-router";
const playlistStore = usePlaylistStore();
const router = useRouter();
const addToPlaylist = async (song) => {
  try {
    const defaultName = `My playlist ${new Date().toLocaleString()}`;
    const response = await playlistStore.createNewPlaylist(defaultName);
    const playlistId = response?.id   
    if (!playlistId) {
      throw new Error("Failed to create playlist - no ID returned");
    }
    const playlistPath = `/playlist/${playlistId}`;
    router.push(playlistPath);
    await playlistStore.addSongToPlaylist(playlistId, song);
  } catch (error) {
    console.error("Error in addToPlaylist:", error);
  }
};
</script>

<template>
  <div>
    <PlaylistSearch @add-song="addToPlaylist" />
  </div>
</template>
