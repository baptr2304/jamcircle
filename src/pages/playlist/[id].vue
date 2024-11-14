<script setup>
import PlaylistSearch from "@/components/playlist//createPlaylist/PlaylistSearch.vue";
import PlaylistHeaderDetail from "@/components/playlist/createPlaylist/PlaylistHeaderDetail.vue";
import SongTable from "@/components/playlist/createPlaylist/SongTable.vue";
import { usePlaylistStore } from "@/stores/playlist";
import { useSongStore } from "@/stores/songs";
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const playlistStore = usePlaylistStore();
const songStores = useSongStore();
const playlistId = computed(() => route.params.id);
const playlistLocal = ref(null);
watchEffect(async () => {
  try {
    const result = await playlistStore.fetchDetailPlaylist(playlistId.value);
    if (result) {
      playlistLocal.value = result;
      console.log("playlistLocal", playlistLocal.value);
    } else {
      console.error("Failed to fetch playlist: No data returned");
    }
  } catch (error) {
    console.error("Error fetching playlist:", error);
  }

  await songStores.fetchSongs();
});
const addToPlaylist = async (song) => {
  try {
    const updatedPlaylist = await playlistStore.addSong(playlistId.value, song);
    if (updatedPlaylist && updatedPlaylist.songs) {
      playlistLocal.value.songs = [...updatedPlaylist.songs];
    }
  } catch (error) {
    console.error("Error adding song to playlist:", error);
  }
};
const updatePlaylistName = async (newName) => {
  try {
    await playlistStore.updatePlaylist(playlistId.value, newName);
    playlistLocal.value.name = newName;
  } catch (error) {
    console.error("Error updating playlist name:", error);
  }
};
</script>

<template>
  <PlaylistHeaderDetail
    v-if="playlistLocal"
    :playlist-data="playlistLocal"
    @update-name="updatePlaylistName"
  />
  <div v-if="playlistLocal" class="ml-10">
    <SongTable
      :playlistId="playlistId"
      v-if="playlistLocal.songs && playlistLocal.songs.length"
      :songs="playlistLocal.songs"
    />
    <p v-else>No songs available in this playlist.</p>
  </div>
  <div v-else class="ml-10">
    <p>Playlist not found. Please try again.</p>
  </div>
  <PlaylistSearch :songs="songStores.songs" @add-song="addToPlaylist" />
</template>
