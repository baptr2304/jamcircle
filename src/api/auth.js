import { $post } from './axios'

export function apiLogin(data) {
  return $post('/auth/login', data)
}

export function apiRegister(data) {
  const { email, mat_khau, ten_nguoi_dung } = data
  return $post('/auth/register', { email, mat_khau, ten_nguoi_dung })
}
