<script setup>
import IconSend from '@/components/icons/IconSend.vue'

const props = defineProps({
  isSidebarVisible: Boolean,
})
const emit = defineEmits(['message'])
const message = ref('')
function sendMessage() {
  if (message.value) {
    emit('message', message.value)

    message.value = ''
  }
}
</script>

<template>
  <div class="relative h-10" :class="{ 'input-message-none': props.isSidebarVisible }">
    <input
      id="default-input"
      v-model="message"
      autocomplete="off"
      type="text"
      class="block w-full p-3 text-gray-900  text-sm dark:bg-secondary dark:text-white border-0 focus:outline-none focus:ring-0 " placeholder="Type a message..."
      @keyup.enter="sendMessage"
      @keydown.stop
    >
    <IconSend class="absolute top-[25%] right-4 cursor-pointer" @click="sendMessage" />
  </div>
</template>

<style scoped>
  @media screen and (max-width: 640px) {
    .input-message-none {
      display: none;
    }

  }
</style>
