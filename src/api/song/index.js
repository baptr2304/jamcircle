import { $get, $post } from '../axios'
import { songsData } from '../mock/songs'

export async function apiGetSongs(title = '', config = {}) {
  try {
    const response = await $get(`/bai_hat/tim_kiem?ten_bai_hat=${title}`, config)
    return response
  }
  catch {
    throw new Error('Invalid search response')
  }
}

export function addSongById(id) {
  // return $get(`/songs/${id}`)

  return Promise.resolve({ data: songsData.find(song => song.id === id) })
}

export function getSongs() {
  const response = $get(`/bai_hat`)
  return response
}
export function getOneSong(id) {
  // return $get(`/songs/${id}`)
  return Promise.resolve({ data: songsData.find(song => song.id === id) })
}
export function uploadSong(data) {
  const { file, ...songData } = data
  const map = Object.entries(songData).map(([key, value]) => {
    return `"${key}":"${value}"`
  })
  const url = `bai_hat?bai_hat={${map.join(',')}}`
  const formData = new FormData()
  formData.append('file', file)
  return $post(url, formData)
}
