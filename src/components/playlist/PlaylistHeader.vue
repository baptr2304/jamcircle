<script setup>
import { fetchUserData } from "@/api/user";
import IconMusicSolid from "@/components/icons/IconMusicSolid.vue";
import { onMounted, ref } from "vue";

const userName = ref("");

onMounted(async () => {
  const userData = await fetchUserData();
  userName.value = userData.data.name;
});
</script>

<template>
  <div class="w-full h-[15rem] bg-muted-foreground flex items-center mb-4">
    <div
      class="w-[11.25rem] h-[11.25rem] bg-muted flex justify-center items-center ml-8 rounded-xs"
    >
      <IconMusicSolid class="w-[3.125rem] h-[3.125rem]" />
    </div>
    <div class="ml-10 h-[11.25rem] flex flex-col justify-between">
      <h5>Playlist</h5>
      <div>
        <h1 class="text-[4rem] font-bold cursor-pointer">Your Playlist</h1>
      </div>
      <h5 class="font-semibold">{{ userName }}</h5>
    </div>
  </div>
</template>
