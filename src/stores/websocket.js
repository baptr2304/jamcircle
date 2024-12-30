import { defineStore } from 'pinia'

export const useWebSocketStore = defineStore('websocket', () => {
  const socket = ref(null)
  const isConnected = ref(false)

  function connect(idRoom) {
    const accessToken = localStorage.getItem('accessToken')
    const url = `${import.meta.env.VITE_WS_BASE_URL}/${idRoom}?access_token=${accessToken}`
    socket.value = new WebSocket(url)
    socket.value.onopen = () => {
      isConnected.value = true
    }
    socket.value.onclose = () => {
      isConnected.value = false
    }
    socket.value.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }

  function sendMessage(message) {
    if (isConnected.value) {
      socket.value.send(message)
    }
    else {
      console.error('WebSocket is not connected.')
    }
  }

  function disconnect() {
    if (socket.value) {
      socket.value.close()
    }
  }

  return {
    socket,
    isConnected,
    connect,
    sendMessage,
    disconnect,
  }
})
