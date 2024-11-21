<script setup>
import IconAddPlaylist from "@/components/icons/IconAddPlaylist.vue";
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

const handlePlaylistClick = (playlistId) => {
  router.push(`/playlist/${playlistId}`);
};
const handleCreatePlaylist = () => {
  router.push("/playlist/create");
};
</script>

<template>
  <div class="relative">
    <PlaylistHeader />
    <div
      class="absolute right-8 top-44 flex justify-center items-center px-4 py-2 rounded-full bg-primary hover:bg-ring cursor-pointer font-semibold"
    >
      <IconAddPlaylist class="w-6 h-6" />
      <div @click="handleCreatePlaylist">Create playlist</div>
    </div>

    <div
      v-if="playlistStore.playlists && playlistStore.playlists.length"
      class="flex flex-wrap gap-5 p-5"
    >
      <div
        v-for="playlist in playlistStore.playlists"
        :key="playlist?.id"
        @click="handlePlaylistClick(playlist.id)"
      >
        <div
          class="w-[22.5rem] bg-secondary border h-[5rem] flex items-center rounded-md cursor-pointer"
        >
          <div
            class="w-[5rem] h-[5rem] flex items-center justify-center bg-muted-foreground rounded-tl-md rounded-bl-md"
          >
            <IconMusicSolid class="w-10 h-10" />
          </div>
          <div class="ml-4">{{ playlist.name }}</div>
        </div>
      </div>
    </div>
    <div v-else-if="!loading && !error">Không có playlist nào</div>
  </div>
</template>
