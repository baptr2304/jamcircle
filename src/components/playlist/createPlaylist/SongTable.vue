<script setup>
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePlaylistStore } from "@/stores/playlist";
import IconEllipsis from "../../icons/IconEllipsis.vue";
const props = defineProps({
  songs: {
    type: Array,
    default: () => [],
  },
  playlistId: {
    type: String,
    required: true,
  },
});
const playlistStore = usePlaylistStore();
const removeSong = (songId) => {
  playlistStore.removeSongFromPlaylist(props.playlistId, songId);
};
</script>

<template>
  <div v-if="songs.length > 0">
    <table class="w-full text-left ml-10">
      <thead>
        <tr>
          <th>Title</th>
          <th>Album</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="song in songs" :key="song.id">
          <td class="flex items-center gap-4 my-2">
            <img
              :src="song.imageUrl"
              :alt="song.title"
              class="w-10 h-10 rounded-xs object-cover"
            />
            <div>
              <h3 class="font-medium text-foreground">{{ song.title }}</h3>
              <p class="text-foreground opacity-50">{{ song.artist }}</p>
            </div>
          </td>
          <td>{{ song.albumName }}</td>
          <td>{{ song.duration }}</td>
          <td>
            <Popover>
              <PopoverTrigger>
                <IconEllipsis class="w-10 h-6 text-white cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent class="w-25">
                <button @click="removeSong(song.id)">Remove</button>
              </PopoverContent>
            </Popover>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <p>No songs available.</p>
  </div>
</template>
