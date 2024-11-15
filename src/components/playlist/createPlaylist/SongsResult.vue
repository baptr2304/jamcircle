<script setup>
const props = defineProps({
  songs: {
    type: Array,
    required: true,
  }
});

const emit = defineEmits(["add-song"]);

const handleAddSong = (song) => {
  emit("add-song", song);
};
</script>
<template>
  <div>
    <div class="mt-4">
      <div
        v-for="song in songs"
        :key="song.id"
        class="flex items-center gap-4 py-4 justify-between"
      >
        <div class="flex items-center gap-4">
          <img
            :src="song.imageUrl"
            :alt="song.title"
            class="w-10 h-10 rounded-xs object-cover"
          />
          <div>
            <h3 class="font-medium text-foreground">{{ song.title }}</h3>
            <p class="text-foreground opacity-50">{{ song.artist.name }}</p>
          </div>
        </div>
        <div>{{ song.albumName }}</div>
        <div class="w-[20%]">
          <div
            @click="handleAddSong(song)"
            class="w-16 h-8 border-2 border-foreground rounded-[10rem] text-xs flex items-center justify-center cursor-pointer"
          >
            ADD
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
