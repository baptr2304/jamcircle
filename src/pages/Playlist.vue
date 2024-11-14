<script setup>
import IconMusicSolid from "@/components/icons/IconMusicSolid.vue";
import PlaylistHeader from "@/components/playlist/PlaylistHeader.vue";
import router from "@/router";
import { usePlaylistStore } from "@/stores/playlist";
import { onMounted, ref } from "vue";
const playlistStore = usePlaylistStore();
const loading = ref(true);

const fetchPlaylists = async () => {
  try {
    loading.value = true;
    await playlistStore.fetchAllPlaylists();
  } catch (err) {
    console.error("Error in fetchPlaylists:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPlaylists();
});
// when click playlist item -> redirect to playlist detail page
const handlePlaylistClick = (playlistId) => {
  router.push(`/playlist/${playlistId}`);
};
</script>

<template>
  <PlaylistHeader />
  <div v-if="playlistStore.playlists && playlistStore.playlists.length">
    <div
      v-for="playlist in playlistStore.playlists"
      :key="playlist?.id"
      @click="handlePlaylistClick(playlist.id)"
    >
      <div
        class="w-[22.5rem] bg-secondary border h-[5rem] m-5 flex items-center rounded-md cursor-pointer"
      >
        <div class="w-[5rem] h-[5rem] flex items-center justify-center">
          <IconMusicSolid class="w-10 h-10" />
        </div>
        <div class="">{{ playlist.name }}</div>
      </div>
    </div>
  </div>
  <div v-else-if="!loading && !error">Không có playlist nào</div>
</template>
