import { $post } from './axios'

export async function apiLogin(data) {
  try {
    const response = await $post('/auth/dang_nhap', data)

    if (response?.ma_xac_thuc && response?.ma_lam_moi) {
      localStorage.setItem('accessToken', response.ma_xac_thuc)
      localStorage.setItem('refreshToken', response.ma_lam_moi)
      return response
    }
    else {
      throw new Error('Invalid login response')
    }
  }
  catch (error) {
    throw error
  }
}

export function apiRegister(data) {
  const { email, mat_khau, ten_nguoi_dung } = data
  return $post('/auth/dang_ky', { email, mat_khau, ten_nguoi_dung })
}
