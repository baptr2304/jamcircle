<script setup>
import PlaylistSearch from "@/components/playlist//createPlaylist/PlaylistSearch.vue";
import PlaylistHeaderDetail from "@/components/playlist/createPlaylist/PlaylistHeaderDetail.vue";
import SongTable from "@/components/playlist/createPlaylist/SongTable.vue";
import { usePlaylistStore } from "@/stores/playlist";
import { useUserStore } from "@/stores/user";
import { computed, onMounted } from "vue";
const route = useRoute();
const playlistStore = usePlaylistStore();
const playlistId = computed(() => route.params.id);
const songsPlaylist = ref([]);
const currentPlaylist = ref(null);
const userStore = useUserStore();
const user = userStore.user;
onMounted(async () => {
  try {
    currentPlaylist.value = await playlistStore.fetchDetailPlaylist(
      playlistId.value
    );
    songsPlaylist.value = await playlistStore.fetchSongsPlaylist(
      playlistId.value
    );
  } catch {
    console.error("Error fetching playlist detail");
  }
});

const addToPlaylist = async (song) => {
  try {
    await playlistStore.addSongToPlaylist(playlistId.value, song);
  } catch (error) {
    console.error("Error adding song to playlist:", error);
  }
};
const updatePlaylistName = async (newName) => {
  try {
    await playlistStore.updatePlaylistName(playlistId.value, newName);
    currentPlaylist.value.ten_danh_sach_phat = newName;
  } catch (error) {
    console.error("Error updating playlist name:", error);
  }
};
</script>

<template>
  <div :id="playlistId">
    <PlaylistHeaderDetail
      :playlistName="currentPlaylist?.ten_danh_sach_phat"
      :playlistImg ="currentPlaylist?.anh"
      @update-name="updatePlaylistName"
    />
    <div v-if="songsPlaylist" class="ml-10">
      <SongTable
        :playlistId="playlistId"
        v-if="songsPlaylist"
        :songs="songsPlaylist"
        :currentPlaylistOwner="currentPlaylist?.nguoi_dung_id"
      />
      <p v-else>No songs available in this playlist.</p>
    </div>
    <div v-else class="ml-10">
      <p>Playlist not found. Please try again.</p>
    </div>
    <PlaylistSearch
      v-if="user?.id === currentPlaylist?.nguoi_dung_id"
      :songsPlaylist="songsPlaylist || []"
      @add-song="addToPlaylist"
      :playlistSongs="currentPlaylist"
    />
  </div>
</template>
