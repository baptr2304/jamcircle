<script setup>
import MessageInput from './messageList/MessageInput.vue'
import MessageList from './messageList/MessageList.vue'

const props = defineProps({
  messages: {
    type: Array,
    required: true,
  },
  isSidebarVisible: Boolean,
  userId: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['toggle-sidebar', 'message'])
function handleMessage(messageContent) {
  emit('message', messageContent)
}
</script>

<template>
  <div
    class="chat flex flex-col h-full w-full pb-4"
    :class="[{ 'chat-expanded': !isSidebarVisible }]"
  >
    <MessageList :messages="messages" :user-id="userId" />
    <MessageInput :is-sidebar-visible="props.isSidebarVisible" @message="handleMessage" />
  </div>
</template>

<style scoped>
.chat {
  width: calc(100% - 21.75rem);
  transition: width 0.3s ease-in-out;
}
.chat-expanded {
  width: 100%;
}
</style>
