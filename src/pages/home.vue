<route>
  {
      meta: {
          layout: "default",
          title: "Home",
      }
  }
</route>

<script setup>
import Card from '@/components/home/Card/Card.vue'
import { usePlaylistStore } from '@/stores/playlist'
import { useAsyncState, useInfiniteScroll } from '@vueuse/core'

const playlistStore = usePlaylistStore()
const container = ref(null)
const cards = ref([])
const query = ref({
  offset: 0,
  limit: 12,
})
const { isLoading, execute } = useAsyncState(
  async () => {
    const response = await playlistStore.getPlaylists({ params: query.value })
    cards.value.push(...response)
  },
  { id: null },
)
useInfiniteScroll(
  container,
  async () => {
    query.value.offset += query.value.limit
    await execute()
  },
  { distance: 0 },
)
</script>

<template>
  <div ref="container" class="p-6 space-y-6 h-full overflow-y-auto scrollbar">
    <h1 class="text-2xl font-bold">
      Albums
    </h1>

    <div class="grid gap-6 justify-center md:grid-cols-4 sm:grid-cols-3 grid-cols-2 xl:grid-cols-5 2xl:grid-cols-6">
      <Card v-for="card in cards" :key=" card.id " v-bind=" card " />
    </div>
    <div v-show=" isLoading " class="flex w-full p-8 justify-center items-center">
      <Icon name="IconLoading" />
    </div>
  </div>
</template>
