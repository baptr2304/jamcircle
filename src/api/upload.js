import { $post } from './axios'

export function uploadImage(file) {
  const formData = new FormData()
  formData.append('file', file)
  return $post('/common/upload-file', formData)
}
