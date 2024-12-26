import { $get } from './axios'

export async function apiGetAllUsers() {
  const response = await $get('/quan_tri_vien/nguoi_dung')
  return response
}
export async function apiSearch(username = '') {
  const response = await $get(`/quan_tri_vien/nguoi_dung/tim_kiem?ten_nguoi_dung=${username}`)
  return response
}
export async function apiGetUserById(id) {
  const response = await $get(`/quan_tri_vien/nguoi_dung/${id}`)
  return response
}