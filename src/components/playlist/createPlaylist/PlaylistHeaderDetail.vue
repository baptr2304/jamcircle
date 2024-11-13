<script setup>
import { fetchUserData } from "@/api/user";
import IconMusicSolid from "@/components/icons/IconMusicSolid.vue";
import { usePlaylistStore } from "@/stores/playlist"; // Sửa lại cách import
import { onMounted, ref } from "vue";
import { useUserStore} from '@/stores/user'
const playlistName = ref("");
const newPlaylistName = ref("");
const isEditingPlaylistName = ref(false);
const playlistStore = usePlaylistStore();
const userStore = fetchUserData();

// Giả sử playlistId được truyền vào component hoặc lấy từ route params
const props = defineProps({
  playlistId: {
    type: String,
    required: true,
  },
});
onMounted(async () => {

  // Lấy thông tin playlist từ store
  const playlist = playlistStore.fetchDetailPlaylist(props.playlistId);
  if (playlist) {
    playlistName.value = playlist.name;
    newPlaylistName.value = playlist.name;
  }
});

const handleEditPlaylistName = () => {
  isEditingPlaylistName.value = true;
};

const savePlaylistName = () => {
  if (newPlaylistName.value.trim()) {
    // Cập nhật tên trong store
    playlistStore.updatePlaylistName(props.playlistId, newPlaylistName.value);
    playlistName.value = newPlaylistName.value;
    isEditingPlaylistName.value = false;
  }
};
</script>

<template>
  <div class="w-full h-[15rem] bg-muted-foreground flex items-center mb-4">
    <div
      class="w-[11.25rem] h-[11.25rem] bg-muted flex justify-center items-center ml-8 rounded-xs"
    >
      <IconMusicSolid class="w-[3.125rem] h-[3.125rem]" />
    </div>
    <div class="ml-10 h-[11.25rem] flex flex-col justify-between">
      <h5>Playlist</h5>
      <div>
        <input
          v-if="isEditingPlaylistName"
          v-model="newPlaylistName"
          @keydown.enter="savePlaylistName"
          @blur="savePlaylistName"
          @keydown.escape="isEditingPlaylistName = false"
          class="w-72 h-8 px-2 border border-input rounded-md bg-secondary"
        />
        <template v-else>
          <h1
            class="text-[4rem] font-bold cursor-pointer"
            @click="handleEditPlaylistName"
          >
            {{ playlistName }}
          </h1>
        </template>
      </div>
      <h5 class="font-semibold">{{ userStore.user }}</h5>
    </div>
  </div>
</template>
