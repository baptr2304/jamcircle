<script setup>
import IconMusicSolid from "@/components/icons/IconMusicSolid.vue";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
const props = defineProps({
  playlistData: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update-name"]);

const newPlaylistName = ref(props.playlistData.name);
const isEditingPlaylistName = ref(false);
const userStore = useUserStore();
watch(
  () => props.playlistData.name,
  (newName) => {
    newPlaylistName.value = newName;
  }
);
const handleEditPlaylistName = () => {
  isEditingPlaylistName.value = true;
};

const savePlaylistName = () => {
  if (newPlaylistName.value.trim()) {
    emit("update-name", newPlaylistName.value.trim());
  }
  isEditingPlaylistName.value = false;
};
</script>

<template>
  <div class="w-full h-[15rem] bg-accent flex items-center mb-4">
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
            {{ props.playlistData.name }}
          </h1>
        </template>
      </div>
      <h5 class="font-semibold">{{ userStore.user.name }}</h5>
    </div>
  </div>
</template>
