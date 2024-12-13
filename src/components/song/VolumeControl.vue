<script setup>
import { Progress } from '@/components/ui/progress'

const props = defineProps({
  muted: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['toggleMuted'])
const volume = defineModel()
const progressBar = ref(null)
function updateProgress(event) {
  const rect = progressBar.value.getBoundingClientRect()
  if (event.clientX < rect.left) {
    volume.value = 0
    return
  }
  if (event.clientX > rect.right) {
    volume.value = 100
    return
  }
  const offsetX = event.clientX - rect.left
  const width = rect.width
  volume.value = Math.round((offsetX / width) * 100)
}

function handleMouseMove(event) {
  event.preventDefault()
  updateProgress(event)
}

function handleMouseUp() {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

function handleMouseDown(event) {
  updateProgress(event)
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}
function toggleMuted() {
  emit('toggleMuted')
}
</script>

<template>
  <div class="flex items-center justify-center gap-2 p-2">
    <Icon v-if="!props.muted" name="IconVolume" class="cursor-pointer" @click="toggleMuted" />
    <Icon v-else name="IconVolumeMute" class="cursor-pointer" @click="toggleMuted" />
    <div
      ref="progressBar"
      class="flex items-center justify-center gap-2 w-28 cursor-pointer"
      @mousedown="handleMouseDown"
    >
      <Progress v-model="volume" class="w-full" />
    </div>
  </div>
</template>
