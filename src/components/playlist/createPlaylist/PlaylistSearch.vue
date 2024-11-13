<script setup>
import ScrollArea from "../../ui/scroll-area/ScrollArea.vue";
import SongsResult from "./SongsResult.vue";
const props = defineProps({
  songs: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["add-song"]);
const searchQuery = ref("");
const searchResults = ref([]);
const handleSearch = () => {
  searchResults.value = props.songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      song.artist.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};
const addSong = (song) => {
  emit("add-song", song);
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
    <ScrollArea class="mt-4 w-full h-80">
      <SongsResult
        v-if="searchResults.length > 0"
        :songs="searchResults"
        @add-song="addSong"
      />
      <div
        v-else-if="searchQuery.trim() !== ''"
        class="text-center text-gray-500"
      >
        Not found any songs.
      </div>
    </ScrollArea>
  </div>
</template>
