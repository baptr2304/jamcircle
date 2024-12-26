import { $get, $put } from './axios'

export function getUser() {
  return $get('/nguoi_dung/')
    .then((response) => {
      return {
        id: response.id,
        username: response.ten_nguoi_dung,
        email: response.email,
        avatar: response.anh_dai_dien,
        // gender: response?.gioi_tinh || 'female'
        role: response.quyen,

      }
    })
}
export function update(data) {
  return $put('/nguoi_dung/', data)
}
