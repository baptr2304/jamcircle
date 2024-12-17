<script setup>
const props = defineProps({
  icon: String,
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div
    class="w-full h-[15rem] bg-gradient-to-t from-accent to-gray-600 flex items-center mb-4"
  >
    <div
      class="lg:w-[11.25rem] lg:h-[11.25rem] w-[8rem] h-[8rem] bg-gradient-to-t from-accent to-gray-700 flex justify-center items-center ml-8 rounded-xs"
    >
      <Icon :name="props.icon" class="lg:w-12 lg:h-12 w-8 h-8" />
    </div>
    <div class="ml-10 h-[11.25rem] flex justify-between items-center">
      <h1 class="text-2xl md:text-[4rem] font-bold cursor-pointer">
        {{ props.title }}
      </h1>
    </div>
  </div>
</template>
