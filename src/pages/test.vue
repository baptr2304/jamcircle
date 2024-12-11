<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core'
import { ref } from 'vue'

const el = ref<HTMLElement | null>(null)
const data = ref<number[]>([])
const isLoading = ref(false)
const { reset } = useInfiniteScroll(
    el,
    async () => {
        const length = data.value.length + 1
        isLoading.value = true
        await new Promise((r) => setTimeout(r, 1000))
        data.value.push(...Array.from({ length: 5 }, (_, i) => length + i))
        isLoading.value = false
    },
    { distance: 0 },
)

function resetList() {
    data.value = []
    reset()
}
</script>

<template>
    <div ref="el" class="container">
        <div v-for="item in data" :key=" item " class="h-15 bg-gray-500/5 rounded p-3">
            {{ item }}
        </div>
        <div v-show=" isLoading " class="flex w-full p-8 justify-center items-center">
            <Icon name="IconLoading" />
        </div>
    </div>
    <button @click="resetList()">
        Reset
    </button>
</template>

<style scoped lang="scss">
.container {
    @apply flex flex-col gap-2 p-4 w-60 h-60 m-auto overflow-y-scroll bg-gray-500/5 rounded
}
</style>