import { $delete, $get, $post, $put } from '@/api/axios'

export function apiCreateRoom(ten_phong) {
  return $post('/phong_nghe_nhac', { ten_phong })
}

export function apiListRoom() {
  return $get('/phong_nghe_nhac')
}

export function apiGetDetailRoom(id) {
  return $get(`/phong_nghe_nhac/${id}`)
}

export function apiGetRoomMembers(id) {
  return $get(`/phong_nghe_nhac/thanh_vien_phong/${id}`)
}

export function apiGetListRequestJoinRoom(id) {
  return $get(`/phong_nghe_nhac/xem_yeu_cau_tham_gia_phong/${id}`)
}

export function apiRequestJoinRoom(id) {
  return $get(`/phong_nghe_nhac/yeu_cau_tham_gia_phong/${id}`)
}

export function apiAcceptJoinRoom(id, accept) {
  return $put(`/phong_nghe_nhac/cap_nhat_yeu_cau_tham_gia_phong?yeu_cau_tham_gia_phong_id=${id}&chap_nhan=${accept}`)
}

// {
//   "ten_phong": "zzz",
//   "trang_thai_phat": "tam_dung",
//   "thoi_gian_hien_tai_bai_hat": 111,
//   "so_thu_tu_bai_hat_dang_phat": 1
// }
export function apiUpdateRoom(data) {
  const { id, ...roomData } = data
  return $put(`/phong_nghe_nhac/cap_nhat_phong_nghe_nhac?phong_nghe_nhac_id=${id}`, roomData)
}

export function apiUpdatePermission(id, role) {
  return $put(`/phong_nghe_nhac/cap_nhat_quyen_thanh_vien_phong?thanh_vien_phong_id=${id}&quyen=${role}`)
}

export function apiLeaveRoom(id) {
  return $delete(`/phong_nghe_nhac/roi_phong?phong_nghe_nhac_id=${id}`)
}

export function apiDeleteMember(id) {
  return $delete(`/phong_nghe_nhac/xoa_thanh_vien_phong?thanh_vien_phong_id=${id}`)
}
