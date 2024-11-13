<script setup>
import PlaylistSearch from "@/components/playlist//createPlaylist/PlaylistSearch.vue";
import PlaylistHeader from "@/components/playlist/createPlaylist/PlaylistHeaderDetail.vue";
import SongTable from "@/components/playlist/createPlaylist/SongTable.vue";
import { usePlaylistStore } from "@/stores/playlist";
import { useSongStore } from "@/stores/songs";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const playlistStore = usePlaylistStore();
const songStores = useSongStore();

onMounted(() => {
  playlistStore.loadFromLocalStorage();

  songStores.fetchSongs();
});

const playlistId = computed(() => route.params.id);
const addToPlaylist = async (song) => {
  if (currentPlaylist.value) {
    playlistStore.addSong(playlistId.value, song);
  }
};
</script>

<template>
  <PlaylistHeader :playlistId="playlistId" />
  <div v-if="playlistStore.currentPlaylist" class="ml-10">
    <SongTable
      :playlistId="playlistId"
      v-if="currentPlaylist.songs && currentPlaylist.songs.length"
      :songs="currentPlaylist.songs"
    />
    <p v-else>No songs available in this playlist.</p>
  </div>
  <div v-else>
    <p>Playlist not found. Please try again.</p>
  </div>
  <PlaylistSearch :songs="songStores.songs" @add-song="addToPlaylist" />
</template>
