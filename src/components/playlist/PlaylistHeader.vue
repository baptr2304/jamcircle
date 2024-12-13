<script setup>
const props = defineProps({
  icon: String,
})
</script>

<template>
  <div
    class="w-full h-[15rem] bg-gradient-to-t from-accent to-gray-600 flex items-center mb-4"
  >
    <div
      class="w-[11.25rem] h-[11.25rem] bg-gradient-to-t from-accent to-gray-700 flex justify-center items-center ml-8 rounded-xs"
    >
      <Icon :name="props.icon" class="w-12 h-12" />
    </div>
    <div class="ml-10 h-[11.25rem] flex justify-between items-center">
      <h1 class="text-[4rem] font-bold cursor-pointer">My Playlist</h1>
    </div>
  </div>
</template>
