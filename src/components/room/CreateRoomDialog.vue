<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref } from 'vue'

const { open } = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:open', 'create'])

const roomName = ref('')

function handleCreate() {
  if (!roomName.value.trim())
    return
  emit('create', roomName.value)
  emit('update:open', false)
}
</script>

<template>
  <Dialog :open="open" @update:open="(value) => emit('update:open', value)">
    <DialogContent class="sm:max-w-[425px] p-4">
      <DialogHeader>
        <DialogTitle>Tạo phòng nghe nhạc</DialogTitle>
        <DialogDescription>
            Nhập tên cho phòng nghe nhạc của bạn. Nhấn "Tạo" khi bạn sẵn sàng.
        </DialogDescription>
      </DialogHeader>
      <div class="grid grid-cols-4 items-center gap-2">
        <Label for="room-name" class="text-right"> Tên phòng </Label>
        <Input
          id="room-name"
          v-model="roomName"
          placeholder="Nhập tên phòng"
          class="col-span-3"
          autocomplete="off"
        />
      </div>
      <DialogFooter>
        <Button
          type="submit"
          :disabled="!roomName.trim()"
          @click="handleCreate"
        >
          Tạo
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
