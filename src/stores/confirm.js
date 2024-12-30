import { defineStore } from 'pinia'

export const useConfirmStore = defineStore('confirm', () => {
  const title = ref('')
  const message = ref('')
  const cancelText = ref('Hủy')
  const confirmText = ref('Xác nhận')
  const visible = ref(false)
  let resolveFn

  function showConfirmDialog(params) {
    visible.value = true
    title.value = params.title
    message.value = params.message
    cancelText.value = params.cancelText || 'Hủy'
    confirmText.value = params.confirmText || 'Xác nhận'
    return new Promise((resolve) => {
      resolveFn = resolve
    })
  }

  function cancel() {
    visible.value = false
    resolveFn(false)
  }

  function confirm() {
    visible.value = false
    resolveFn(true)
  }
  return { title, message, visible, showConfirmDialog, cancel, confirm, cancelText, confirmText }
})
