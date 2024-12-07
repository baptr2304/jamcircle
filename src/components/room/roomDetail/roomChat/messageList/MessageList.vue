<script setup>
import ScrollArea from "@/components/ui/scroll-area/ScrollArea.vue";

const props = defineProps({
  messages: {
    type: Array,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
</script>

<template>
  <ScrollArea>
    <div class="messages-container">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="[
          'message-wrapper',
          message.senderId === userId ? 'sent' : 'received',
        ]"
      >
        <div v-if="message.senderId !== userId" class="avatar">
          <div class="avatar-circle">
            {{ message.username?.[0] || "U" }}
          </div>
        </div>

        <div class="message-content">
          <div v-if="message.senderId !== userId" class="sender-name">
            {{ message.username || "User" }}
          </div>

          <div class="message-bubble">
            <p class="message-text">{{ message.content }}</p>
          </div>

          <div class="timestamp">
            {{ formatTime(message.createdAt) }}
          </div>
        </div>
        <div v-if="message.senderId === userId" class="avatar">
          <div class="avatar-circle sent">You</div>
        </div>
      </div>
    </div>
  </ScrollArea>
</template>

<style scoped>
.messages-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  height: 72vh;
}

.message-wrapper {
  display: flex;
  gap: 8px;
  max-width: 80%;
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
  background: #4caf50;
  color: white;
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
