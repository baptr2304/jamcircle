<script setup>
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSongStore } from "@/stores/song";
import SongsResult from "./SongsResult.vue";

const props = defineProps({
  songsPlaylist: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["add-song"]);
const searchQuery = ref("");
const searchResults = ref([]);
const showDuplicateDialog = ref(false);
const selectedSong = ref(null);
const songStore = useSongStore();
const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    return;
  }
  try {
    const songs = await songStore.searchSongs(searchQuery.value);
    searchResults.value = songs;
  } catch (error) {
    console.error("Search error:", error);
    searchResults.value = [];
  }
};
const handleDuplicateSong = (song) => {
  selectedSong.value = song;
  showDuplicateDialog.value = true;
};

const handleAddSong = (song) => {
  if (props.songsPlaylist.some((s) => s.id === song.id)) {
    handleDuplicateSong(song);
    return;
  }
  emit("add-song", song);
};
const handleConfirmAdd = () => {
  emit("add-song", selectedSong.value);
  showDuplicateDialog.value = false;
};
const handleClose = () => {
  showDuplicateDialog.value = false;
};
</script>
<template>
  <div class="ml-10">
    <h1 class="my-4 font-medium">Let's find something for your playlist</h1>
    <div class="relative w-full max-w-sm items-center">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        ref="input-search"
        id="search"
        type="text"
        placeholder="Search..."
        class="flex h-10 w-[20rem] border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-card-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-10 text-white rounded-full bg-background placeholder:opacity-50"
      />
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center h-10 pl-4 pr-2"
      >
        <Icon name="IconSearch" class="w-4 text-muted-foreground" />
      </span>
    </div>
    <AlertDialog :open="showDuplicateDialog" @update:open="handleClose">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Already added</AlertDialogTitle>
          <AlertDialogDescription>
            This song is already in your playlist.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="handleClose">Don't add</AlertDialogCancel>
          <AlertDialogAction @click="handleConfirmAdd"
            >Add anyway</AlertDialogAction
          >
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    <div class="mt-4 overflow-y-auto scrollbar">
      <SongsResult
        v-if="searchResults.length > 0"
        :songs="searchResults"
        @add-song="handleAddSong"
      />
      <div
        v-else-if="searchQuery.trim() !== ''"
        class="text-center text-gray-500"
      >
        Not found any songs.
      </div>
    </div>
  </div>
</template>
