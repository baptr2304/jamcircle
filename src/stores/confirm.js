import { defineStore } from 'pinia'

export const useConfirmStore = defineStore('confirm', () => {
  const title = ref('')
  const message = ref('')
  const visible = ref(false)
  let resolveFn

  function showConfirmDialog(params) {
    visible.value = true
    title.value = params.title
    message.value = params.message
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
  return { title, message, visible, showConfirmDialog, cancel, confirm }
})
