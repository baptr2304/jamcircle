import * as apiRoom from '@/api/room'
import { defineStore } from 'pinia'

export const useRoomStore = defineStore('room', () => {
  async function createRoom(ten_phong) {
    return apiRoom.apiCreateRoom(ten_phong)
  }

  async function listRoom() {
    return apiRoom.apiListRoom()
  }

  async function getDetailRoom(id) {
    return apiRoom.apiGetDetailRoom(id)
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

  async function updateRoom(data) {
    return apiRoom.apiUpdateRoom(data)
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

  return {
    createRoom,
    listRoom,
    getDetailRoom,
    getRoomMembers,
    getListRequestJoinRoom,
    requestJoinRoom,
    acceptJoinRoom,
    updateRoom,
    updatePermission,
    leaveRoom,
    deleteMember,
  }
})
