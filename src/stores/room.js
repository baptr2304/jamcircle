import { addMessage, addToQueue, createRoom, getAll, getById } from '@/api/room'
import { defineStore } from 'pinia'

export const useRoomStore = defineStore('room', () => {
  const rooms = ref([])
  const currentRoom = ref(null)
  async function createNewRoom(params) {
    try {
      const { data } = await createRoom(params)
      currentRoom.value = data
      return data
    }
    catch (error) {
      console.error('Error in createNewRoom:', error)
      throw error
    }
  }
  async function getAllRooms() {
    try {
      const { data } = await getAll()
      rooms.value = data || []
      return data
    }
    catch (error) {
      console.error('Error in getAllRooms:', error)
      throw error
    }
  }
  async function getRoomById(id) {
    try {
      const { data } = await getById(id)
      currentRoom.value = data
      return data
    }
    catch (error) {
      console.error('Error in getRoomById:', error)
      throw error
    }
  }
  async function addSongToRoomPlaylist(roomId, songId) {
    try {
      const { data } = await addToQueue(roomId, songId)
      currentRoom.value = data
      return data
    }
    catch (error) {
      console.error('Error in addSongToRoomPlaylist:', error)
      throw error
    }
  }
  async function removeSongInRoom(roomId, uniqueKey) {
    try {
      const data = await removeFromQueue(roomId, uniqueKey)
      if (currentRoom.value.queue && currentRoom.value.queue.id === roomId) {
        const index = currentRoom.value.findIndex(
          song => song.uniqueKey === uniqueKey,
        )
        if (index !== -1) {
          currentRoom.value.queue.splice(index, 1)
        }
      } console.log(data)
      return data
    }
    catch {
      console.error('Error in removeSongInRoom:', error)
      throw error
    }
  }
  async function addMessageToRoom(roomId, message) {
    try {
      const data = await addMessage(roomId, message)
      if (currentRoom.value.messages && currentRoom.value.messages.id === roomId) {
        currentRoom.value.messages.push(data)
      }
      return data
    }
    catch (error) {
      console.error('Error in addMessageToRoom:', error)
      throw error
    }
  }
  return {
    rooms,
    currentRoom,
    createNewRoom,
    getAllRooms,
    getRoomById,
    addSongToRoomPlaylist,
    removeSongInRoom,
    addMessageToRoom,
  }
})
