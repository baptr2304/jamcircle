<script setup>
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import Separator from '@/components/ui/separator/Separator.vue'
import listEvents from '@/utils/enumEventBus'
import emitter from '@/utils/eventBus'
import listShortcuts from '@/utils/listShortcuts'
import { useDebounceFn } from '@vueuse/core'
const debouncedKeyPress = useDebounceFn((event) => {
  handleKeyPress(event)
}, 200)
const isVisibleDialog = ref(false)
function handleKeyPress(event) {
  console.log(event)
  switch (event.code) {
    case 'Space':
      event.preventDefault()
      emitter.emit(listEvents.togglePlay)
      break
    case 'Escape':
      emitter.emit(listEvents.closeQueueDrawer)
      break
    case 'KeyQ':
      emitter.emit(listEvents.toggleQueueDrawer)
      break
    case 'ArrowRight':
      if (event.ctrlKey) {
        emitter.emit(listEvents.nextSong)
      }
      if (event.shiftKey) {
        emitter.emit(listEvents.seekForward)
      }
      break
    case 'ArrowLeft':
      if (event.ctrlKey) {
        emitter.emit(listEvents.prevSong)
      }
      if (event.shiftKey) {
        emitter.emit(listEvents.seekBackward)
      }
      break
    case 'Slash':
      if (event.ctrlKey) {
        isVisibleDialog.value = !isVisibleDialog.value
      }
      break
    case 'ArrowDown':
      if (event.ctrlKey) {
        emitter.emit(listEvents.volumeDown)
      }
      break
    case 'ArrowUp':
      if (event.ctrlKey) {
        emitter.emit(listEvents.volumeUp)
      }
      break
    case 'KeyM':
      if (event.ctrlKey) {
        emitter.emit(listEvents.toggleMute)
      }
      break
  }
}
onMounted(() => {
  document.addEventListener('keydown', debouncedKeyPress)
})
onUnmounted(() => {
  document.removeEventListener('keydown', debouncedKeyPress)
})
</script>

<template>
  <Dialog :open="isVisibleDialog" @update:open="(value) => isVisibleDialog = value">
    <DialogContent class="sm:max-w-[425px]">
      <div class="grid gap-4 py-4">
        <div class="header grid gap-2">
          <h1 class="text-[2rem] font-semibold">
            Keyboard Shortcuts
          </h1>
          <p>
            Press <span class="border p-1 rounded border-foreground">Ctrl</span> <span class="border p-1 rounded border-foreground">/</span> to toggle this modal.
          </p>
          <Separator class="my-2" />
        </div>
        <div class="grid gap-2 max-h-[50vh] overflow-y-auto pr-4 pb-4 scrollbar">
          <div
            v-for="(shortcut, index) in listShortcuts"
            :key="index"
            class="grid gap-4 "
          >
            <h2 class="font-bold text-2xl">
              {{ shortcut.section }}
            </h2>
            <div
              v-for="(item, id) in shortcut.list"
              :key="id"
              class="grid grid-cols-2"
            >
              <div>
                {{ item.description }}
              </div>
              <div class="grid gap-2 font-medium">
                <div class="flex justify-end gap-2">
                  <span
                    v-for="(key, keyboardIndex) in item.keyboards"
                    :key="keyboardIndex"
                    class="border p-1 rounded border-foreground"
                  >
                    {{ key }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
