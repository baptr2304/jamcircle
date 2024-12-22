<!-- components/dialogs/JoinRoomDialog.vue -->
<script setup>
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ref } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['update:open', 'join'])
const roomId = ref('')

function handleJoin() {
  if (!roomId.value.trim())
    return
  emit('join', roomId.value)
  roomId.value = ''
  emit('update:open', false)
}
</script>

<template>
  <Dialog :open="open" @update:open="(value) => emit('update:open', value)">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Join Room by ID</DialogTitle>
      </DialogHeader>
      <div class="space-y-4 py-4">
        <Input v-model="roomId" placeholder="@RoomID" class="w-full" />
        <Button class="w-full" :disabled="!roomId.trim()" @click="handleJoin">
          Join
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
