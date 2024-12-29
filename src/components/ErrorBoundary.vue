<script setup>
import { toast } from '@/components/ui/toast'

onMounted(() => {
  window.addEventListener('unhandledrejection', (event) => {
    event.promise.catch((error) => {
      const errorMessage = error?.response?.data?.detail || 'Có xảy ra lỗi. Vui lòng thử lại.'
      if (errorMessage) {
        toast({
          title: 'Thất bại',
          description: errorMessage,
          variant: 'destructive',
          duration: 5000,
        })
        return
      }
      toast({
        title: 'Thất bại',
        description: 'Có xảy ra lỗi. Vui lòng thử lại.',
        variant: 'destructive',
        duration: 5000,
      })
    })
  })
})

onUnmounted(() => {
  window.removeEventListener('unhandledrejection', () => {})
})
</script>

<template>
  <slot />
</template>
