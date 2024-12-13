<script setup>
import IconAddPlaylist from "@/components/icons/IconAddPlaylist.vue";
import IconMusicSolid from "@/components/icons/IconMusicSolid.vue";
import PlaylistHeader from "@/components/playlist/PlaylistHeader.vue";
import router from "@/router";
import { usePlaylistStore } from "@/stores/playlist";
const playlistStore = usePlaylistStore();
onMounted(async () => {
  try {
    await playlistStore.getMyPlaylists();
  } catch (error) {
    console.error("Error fetching playlists:", error);
  }
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
    <PlaylistHeader icon="IconMusicSolid" />
    <div
      class="absolute right-8 top-44 flex justify-center items-center px-4 py-2 rounded-full bg-primary hover:bg-ring cursor-pointer font-semibold"
    >
      <IconAddPlaylist class="w-6 h-6" />
      <div @click="handleCreatePlaylist">Create playlist</div>
    </div>
    <div class="overflow-y-auto scrollbar max-h-[70%]">
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
              class="w-[5rem] h-[5rem] flex items-center justify-center bg-gradient-to-r from-accent to-gray-700 rounded-tl-md rounded-bl-md"
            >
              <IconMusicSolid class="w-10 h-10" />
            </div>
            <div class="ml-4">{{ playlist.ten_danh_sach_phat }}</div>
          </div>
        </div>
      </div>
      <div v-else-if="!loading && !error">Không có playlist nào</div>
    </div>
  </div>
</template>
