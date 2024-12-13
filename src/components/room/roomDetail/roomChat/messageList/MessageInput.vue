<script setup>
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
  <div class="flex items-center space-x-2 w-[99%]">
    <input
      v-model="message"
      class="w-full px-4 py-2 border border-gray-300 text-foreground bg-inherit"
      placeholder="Type a message..."
      @keyup.enter="sendMessage"
    >
    <button class="px-4 py-2 bg-blue-500 text-white" @click="sendMessage">
      Send
    </button>
  </div>
</template>
