import { $post } from './axios'

export function apiLogin(data) {
  return $post('/auth/login', data)
}

export function apiRegister(data) {
  return $post('/auth/register', data)
}
