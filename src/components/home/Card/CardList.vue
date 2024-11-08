<script setup>
import Card from "@/components/home/Card/Card.vue";
import { fetchAlbums } from "@/api/album/index";
import { onMounted, ref } from "vue";

const cards = ref([]);

onMounted(async () => {
  try {
    const response = await fetchAlbums();
    cards.value = response.data;
  } catch (error) {
    console.error("Error fetching albums:", error);
  }
});
</script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold">Albums</h1>

    <div
      class="grid gap-6 justify-center md:grid-cols-4 sm:grid-cols-3 grid-cols-2 xl:grid-cols-5 2xl:grid-cols-6"
    >
      <Card
        v-for="card in cards"
        :key="card.id"
        :title="card.title"
        :image="card.imageUrl"
      />
    </div>
  </div>
</template>
