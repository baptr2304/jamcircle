import { $post } from './axios';

export function apiLogin(data) {
  return $post('/auth/dang_nhap', data).then((response) => {
    if (response?.ma_xac_thuc && response?.ma_lam_moi) {
      localStorage.setItem('accessToken', response.ma_xac_thuc);
      localStorage.setItem('refreshToken', response.ma_lam_moi);
      return response;
    } else {
      throw new Error('Invalid login response');
    }
  });
}

export function apiRegister(data) {
  const { email, mat_khau, ten_nguoi_dung } = data
  return $post('/auth/dang_ky', { email, mat_khau, ten_nguoi_dung })
}
