import { $post } from './axios'

export function apiLogin(data) {
  return $post('/auth/dang_nhap', data)
}

export function apiRegister(data) {
  const { email, mat_khau, ten_nguoi_dung } = data
  return $post('/auth/dang_ky', { email, mat_khau, ten_nguoi_dung })
}
