<script setup>
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast/use-toast.js'

const { toast } = useToast()
</script>

<template>
  <Button
    variant="outline" @click="() => {
      toast({
        title: 'Scheduled: Catch up',
        description: 'Friday, February 10, 2023 at 5:57 PM',
      });
    }"
  >
    Add to calendar
  </Button>
</template>
