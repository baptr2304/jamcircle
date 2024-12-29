import { $get, $put } from './axios'

export function getUser() {
  return $get('/nguoi_dung/')
    .then((response) => {
      return response
    })
}
export function update(data) {
  return $put('/nguoi_dung/', data)
}
