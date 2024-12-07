<script setup>
import IconEllipsis from "@/components/icons/IconEllipsis.vue";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ScrollArea from "@/components/ui/scroll-area/ScrollArea.vue";
import { useRoomStore } from "@/stores/room";
import SearchInRoom from "./SearchInRoom.vue";

const roomStore = useRoomStore();
const removeSong = (uniqueKey) => {
  roomStore.removeSongFromQueue(uniqueKey);
};
const props = defineProps({
  listSongs: Array,
  roomId: String,
});
</script>
<template>
  <div class="w-full flex items-center justify-center">
    <div class="w-full flex flex-col">
      <SearchInRoom
        class="items-center self-center"
        :roomId="roomId"
        :listSongs="listSongs"
      />
      <h3 class="mx-4 mt-3 text-xl">Queue</h3>

      <ScrollArea
        class="w-full h-[30rem]"
        v-if="listSongs && listSongs.length > 0"
      >
        <div
          v-for="song in listSongs"
          :key="song.uniqueKey"
          class="flex gap-2 py-4 mx-4 border-b-2 justify-between"
        >
          <div class="flex gap-2">
            <img
              :src="song.imageUrl"
              :alt="song.title"
              class="w-10 h-10 rounded-xs object-cover"
            />
            <div>
              <h3 class="font-normal text-foreground truncate">
                {{ song.title }}
              </h3>
              <p class="text-foreground opacity-50">{{ song.artist.name }}</p>
            </div>
          </div>
          <div>{{ song.albumName }}</div>
          <Popover>
            <PopoverTrigger>
              <IconEllipsis class="w-6 h-6 text-foreground cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent class="w-25">
              <button @click="removeSong(song.uniqueKey)">Remove</button>
            </PopoverContent>
          </Popover>
        </div>
      </ScrollArea>
    </div>
  </div>
</template>
