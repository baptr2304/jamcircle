<script setup>
const props = defineProps({
  ten_danh_sach_phat: {
    type: String,
    required: true,
  },

  anh: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="flex justify-center items-center">
    <div
      class="2xl:w-[16rem] lg:w-[12.5rem] sm:w-44 w-[10.5rem] max-sm:max-w-[10.5rem] max-sm:w-full rounded-xs flex items-center flex-col gap-2 hover:bg-secondary cursor-pointer p-4 "
    >
      <img
        v-lazy="anh"
        :alt="ten_danh_sach_phat"
        class="xl:w-[11rem] lg:w-40 md:w-36 w-[9.5rem] xl:h-[10.5rem] lg:h-40 md:h-36 rounded-md object-cover"
      >
      <h2 class="text-sm font-bold  max-sm:font-medium text-center w-full line-clamp-2">
        {{ ten_danh_sach_phat }}
      </h2>
    </div>
  </div>
</template>
