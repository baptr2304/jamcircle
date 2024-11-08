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
  <div class="flex justify-center items-center">
    <div
      class="2xl:w-[16rem] lg:w-[12.5rem] sm:w-44 w-[10.5rem] h-[13rem] sm:h-[16rem] rounded-xs flex items-center flex-col gap-2 hover:bg-secondary cursor-pointer p-4 "
    >
      <img
        :src="image"
        :alt="title"
        class="xl:w-[11rem] lg:w-40 md:w-36 w-[9.5rem] xl:h-[10.5rem] lg:h-40 md:h-36 rounded-md object-cover"
      />
      <div class="p-1 w-[9rem] sm:w-[12rem]">
        <h2 class="text-sm font-bold text-center">{{ title }}</h2>
      </div>
    </div>
  </div>
</template>
