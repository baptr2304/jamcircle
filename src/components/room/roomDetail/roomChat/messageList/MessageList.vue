<script setup>
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'

const props = defineProps({
  messages: {
    type: Array,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
})

function formatTime(date) {
  return new Date(date).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}
const messagesContainerRef = ref(null)
watch(
  () => props.messages,
  (newMessages) => {
    nextTick(() => {
      if (messagesContainerRef.value) {
        messagesContainerRef.value.scrollTop = messagesContainerRef.value.scrollHeight
      }
    })
  },
  { deep: true },
)
function isCurrentUserSender(message) {
  return message.senderId === props.userId
}
</script>

<template>
  <div ref="messagesContainerRef" class="messages-container overflow-y-auto scrollbar h-[calc(100%-2.5px)] py-2">
    <div
      v-for="message in messages"
      :key="message.id"
      class="message-wrapper" :class="[
        isCurrentUserSender(message) ? 'sent' : 'received',
      ]"
    >
      <div class="avatar">
        <div
          class="avatar-circle"
          :class="[
            isCurrentUserSender(message) ? 'sent' : 'received',
          ]"
        >
          {{ !isCurrentUserSender(message) ? (message.username?.[0] || "U") : 'You' }}
        </div>
      </div>

      <div class="message-content">
        <div class="sender-name">
          {{ message.username || "User" }}
        </div>

        <div class="message-bubble">
          <p class="message-text">
            {{ message.content }}
          </p>
        </div>

        <div class="timestamp">
          {{ formatTime(message.createdAt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .messages-container {
    height: calc(100vh - 15.55rem);
  }

}
.messages-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 16px;
  padding-right: 16px;
}

.message-wrapper {
  display: flex;
  gap: 8px;
  max-width: 80%;
  margin-top: 0.5rem;
  justify-content: center;
  align-items: center;
}

.message-wrapper.sent {
  flex-direction: row-reverse;
  margin-left: auto;
}

.message-wrapper.received {
  margin-right: auto;
}
.avatar {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.avatar-circle {
  width: 100%;
  height: 100%;
  background: #e0e0e0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #333;
}

.avatar-circle.sent {
  background: hsl(var(--primary));
  color: hsl(var(--foreground));
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sender-name {
  font-size: 13px;
  color: #666;
  margin-left: 4px;
}

.message-bubble {
  padding: 8px 12px;
  border-radius: 12px;
  background: hsl(var(--foreground));
  max-width: fit-content;
}

.sent .message-bubble {
  background: #e3f2fd;
  margin-left: auto;
}

.message-text {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  color: hsl(var(--background));
}

.timestamp {
  font-size: 12px;
  color: #666;
  margin: 0 4px;
}

.sent .timestamp {
  text-align: right;
}
</style>
