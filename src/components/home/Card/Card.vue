<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="w-full flex justify-center items-center">
    <div
      class="w-[11rem] h-[13rem] sm:w-[14rem] sm:h-[16rem] rounded-xs flex items-center flex-col hover:bg-[#1f1f1f] cursor-pointer"
    >
      <img
        :src="image"
        :alt="title"
        class="w-[9rem] h-[9rem] sm:w-[12rem] sm:h-[12rem] rounded-[1.2rem] p-4 object-cover"
      />
      <div class="p-1 w-[9rem] sm:w-[12rem]">
        <h2 class="text-sm font-bold text-center">{{ title }}</h2>
      </div>
    </div>
  </div>
</template>
