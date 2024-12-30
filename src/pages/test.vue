<script setup>
const accessToken = localStorage.getItem('accessToken')
const url = `${import.meta.env.VITE_WS_BASE_URL}/1ea77642-3459-451a-ae57-678f5276f0d9?access_token=${accessToken}`

const ws = new WebSocket(url)

onMounted(() => {
  ws.onopen = () => {
    console.log('connected')
  }

  ws.onmessage = (event) => {
    console.log(event.data)
  }

  ws.onclose = () => {
    console.log('disconnected')
  }
})
</script>

<template>
  <h1>hello {{ data }}</h1>
  <input v-model="inputData" type="text" @keyup.enter="submit()">
  <button @click="submit()">
    submit
  </button>
  <RouterView />
</template>
