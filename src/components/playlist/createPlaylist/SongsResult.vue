<script setup>
const props = defineProps({
  songs: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["add-song"]);

const handleAddSong = (song) => {
  emit("add-song", song);
};
</script>
<template>
  <div class="overflow-y-auto max-h-[13rem] scrollbar">
    <div class="mt-4">
      <div
        v-for="song in songs"
        :key="song.id"
        class="flex items-center gap-4 py-4 justify-between"
      >
        <div class="flex items-center gap-4">
          <img
            :src="song.anh"
            :alt="song.ten_bai_hat"
            class="w-10 h-10 rounded-xs object-cover"
          />
          <div>
            <h3 class="font-medium text-foreground">{{ song.ten_bai_hat }}</h3>
            <p class="text-foreground opacity-50">{{ song.ten_ca_si }}</p>
          </div>
        </div>
        <div>{{ song.the_loai }}</div>
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
