<script setup>
const props = defineProps({
  songs: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(['add-song'])
function handleAddSong(song) {
  emit('add-song', song)
}
</script>

<template>
  <div class="overflow-y-auto max-h-[12rem] scrollbar">
    <div class="space-y-1">
      <div
        v-for="song in props.songs"
        :key="song.id"
        class="group grid grid-cols-6 justify-between items-center gap-2 hover:bg-secondary py-2 px-4 rounded-md cursor-default w-full"
      >
        <div class="flex items-center gap-2 col-span-5">
          <div class="flex items-center gap-4 relative overflow-clip truncate">
            <img
              :src="song.anh"
              :alt="song.ten_bai_hat"
              class="w-10 h-10 rounded-xs object-cover"
            >
            <div class="w-[calc(100%-3.5rem)]">
              <h3 class="font-medium truncate">
                {{ song.ten_bai_hat }}
              </h3>
              <p class="text-foreground/80 truncate">
                {{ song.ten_ca_si }}
              </p>
            </div>
          </div>
        </div>

        <div class="col-span-1">
          <div
            class="w-16 h-8 border-2 border-foreground rounded-[10rem] text-xs
                   flex items-center justify-center cursor-pointer
                  "
            @click="handleAddSong(song)"
          >
            ADD
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
