<script setup>
const props = defineProps({
  title: String,
  titleTop: String,
  titleBot: String,
  icon: String,
});
</script>

<template>
  <div class="w-full h-[15rem] bg-muted-foreground flex items-center mb-4">
    <div
      class="w-[11.25rem] h-[11.25rem] bg-muted flex justify-center items-center ml-8 rounded-xs"
    >
      <Icon :name="props.icon" />
    </div>
    <div class="ml-10 h-[11.25rem] flex flex-col justify-between">
      <h5>{{ props.titleTop }}</h5>
      <div>
        <h1 class="text-[4rem] font-bold cursor-pointer">{{ props.title }}</h1>
      </div>
      <h5 class="font-semibold">{{ props.titleBot }}</h5>
    </div>
  </div>
</template>
