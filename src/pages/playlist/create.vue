<script setup>
import PlaylistSearch from "@/components/playlist/createPlaylist/PlaylistSearch.vue";
import router from "@/router";
import { usePlaylistStore } from "@/stores/playlist";
import { useSongStore } from "@/stores/songs";
import { onMounted } from "vue";

const playlistStore = usePlaylistStore();
const songStore = useSongStore();



const addToPlaylist = async (song) => {
  try {
    const data = await playlistStore.createNewPlaylist("My playlist");
    if (!data || !data.id) {
      throw new Error("Failed to create playlist - no ID returned");
    }

    const playlistPath = `/playlist/${data.id}`;
    router.push(playlistPath);
    playlistStore.addSong(data.id, song).catch((error) => {
      console.error("Error in addSong:", error);
    });
  } catch (error) {
    console.error("Error in addToPlaylist:", error);
  }
};
</script>

<template>
  <div>
    <PlaylistSearch  @add-song="addToPlaylist" />
  </div>
</template>
