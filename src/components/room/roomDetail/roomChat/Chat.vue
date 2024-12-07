<script setup>
import MessageInput from "./messageList/MessageInput.vue";
import MessageList from "./messageList/MessageList.vue";
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
});
const emit = defineEmits(["toggle-sidebar", "message"]);
const handleMessage = (messageContent) => {
  emit("message", messageContent);
};
watch(
  () => props.messages,
  (newMessages) => {
    nextTick(() => {
      const messagesContainer = document.querySelector('.messages-container');
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
  },
  { deep: true }
);
</script>
<template>
  <div
    :style="{ width: isSidebarVisible ? 'calc(100% - 25rem)' : '100%' }"
    class="relative"
  >
    <div class="flex flex-col justify-center">
      <MessageList :messages="messages" :userId="userId"/>
      <MessageInput class="self-center" @message="handleMessage" />
    </div>
  </div>
</template>
