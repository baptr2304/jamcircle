<script setup>
const props = defineProps({
  messages: {
    type: Array,
    required: true,
  },
  userInRoom: {
    type: Object,
    required: true,
  },
  members: {
    type: Array,
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
  () => {
    nextTick(() => {
      if (messagesContainerRef.value) {
        messagesContainerRef.value.scrollTop = messagesContainerRef.value.scrollHeight
      }
    })
  },
  { deep: true },
)
function isCurrentUserSender(message) {
  return message.thanh_vien_phong_id === props.userInRoom?.id
}
const allMessages = computed(() => {
  return props.messages.map((message) => {
    return {
      ...message,
      nguoi_dung: props.members.find(member => member.id === message.thanh_vien_phong_id),
    }
  })
})
</script>

<template>
  <div ref="messagesContainerRef" class="messages-container overflow-y-auto scrollbar h-[calc(100%-2.5px)] py-2">
    <div
      v-for="message in allMessages"
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
          <img v-lazy="message?.nguoi_dung?.anh_dai_dien" alt="" class="w-8 h-8 rounded-full">
        </div>
      </div>

      <div class="message-content">
        <div class="sender-name">
          {{ message?.nguoi_dung?.ho_ten ?? "Vô danh" }}
        </div>

        <div class="message-bubble">
          <p class="message-text">
            {{ message.noi_dung }}
          </p>
        </div>

        <div class="timestamp">
          {{ formatTime(message.thoi_gian_tao) }}
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
}

.avatar-circle.sent {
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
