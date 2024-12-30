import * as apiRoom from '@/api/room'
import { defineStore } from 'pinia'

export const useRoomStore = defineStore('room', () => {
  async function createRoom(ten_phong) {
    return apiRoom.apiCreateRoom(ten_phong)
  }

  async function listRoom() {
    return apiRoom.apiListRoom()
  }

  async function getRoomMembers(id) {
    return apiRoom.apiGetRoomMembers(id)
  }

  async function getListRequestJoinRoom(id) {
    return apiRoom.apiGetListRequestJoinRoom(id)
  }

  async function requestJoinRoom(id) {
    return apiRoom.apiRequestJoinRoom(id)
  }

  async function acceptJoinRoom(id, accept) {
    return apiRoom.apiAcceptJoinRoom(id, accept)
  }

  async function updatePermission(id, role) {
    return apiRoom.apiUpdatePermission(id, role)
  }

  async function leaveRoom(id) {
    return apiRoom.apiLeaveRoom(id)
  }

  async function deleteMember(id) {
    return apiRoom.apiDeleteMember(id)
  }

  async function getMessages(id) {
    return apiRoom.apiGetListMessages(id)
  }

  return {
    createRoom,
    listRoom,
    getRoomMembers,
    getListRequestJoinRoom,
    requestJoinRoom,
    acceptJoinRoom,
    updatePermission,
    leaveRoom,
    deleteMember,
    getMessages,
  }
})
