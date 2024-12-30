<script setup>
import MessageInput from './messageList/MessageInput.vue'
import MessageList from './messageList/MessageList.vue'

const props = defineProps({
  messages: {
    type: Array,
    required: true,
  },
  isSidebarVisible: Boolean,
  userInRoom: {
    type: Object,
    required: true,
  },
  members: {
    type: Array,
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
    <MessageList :messages="messages" :members="props.members" :user-in-room="props.userInRoom" />
    <MessageInput
      v-if="props.userInRoom?.quyen !== 'thanh_vien'"
      :is-sidebar-visible="props.isSidebarVisible" @message="handleMessage"
    />
    <div
      v-else
      class="relative h-10"
    >
      <div class="w-full p-3  text-sm bg-secondary border-0 focus:outline-none focus:ring-0">
        Bạn không thể soạn tin nhắn
      </div>
    </div>
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
