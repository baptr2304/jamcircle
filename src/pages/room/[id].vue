<route>
     {
      meta: {
          layout: "room",
          title: "Room Detail",
          name: "Room Detail",
      },
      path: "/room/:id"
  }
</route>

<script setup>
import Drawer from '@/components/base/Drawer.vue'
import Chat from '@/components/room/roomDetail/roomChat/Chat.vue'
import RoomHeader from '@/components/room/roomDetail/RoomHeader.vue'
import FriendList from '@/components/room/roomDetail/sidebarDetail/FriendList.vue'
import MusicList from '@/components/room/roomDetail/sidebarDetail/MusicList.vue'
import SearchInRoom from '@/components/room/roomDetail/sidebarDetail/SearchInRoom.vue'
import { useRoomStore } from '@/stores/room'
import { useRoomQueue } from '@/stores/room-queue'
import { useUserStore } from '@/stores/user'
import listEvents from '@/utils/enumEventBus'
import emitter from '@/utils/eventBus'
import { useRoute } from 'vue-router'

const roomStore = useRoomStore()
const roomQueueStore = useRoomQueue()
const route = useRoute()
const currentUser = useUserStore()
const user = currentUser.user
const userId = user.id
const messages = ref([])
const isSidebarVisible = ref(true)
const activeTab = ref('friends')
const roomId = computed(() => route.params.id)
const roomData = computed(() => roomStore.currentRoom)

function toggleSidebar() {
  isSidebarVisible.value = !isSidebarVisible.value
}

function closeSidebar() {
  isSidebarVisible.value = false
}

function setActiveTab(tab) {
  activeTab.value = tab
}
watch(
  roomId,
  async (newRoomId) => {
    try {
      await roomStore.getRoomById(newRoomId)
      messages.value = roomStore.currentRoom.messages
    }
    catch (error) {
      console.error('Error fetching room:', error)
    }
  },
  { immediate: true },
)

async function handleMessage(messageContent) {
  try {
    if (messageContent.trim()) {
      const newMessage = {
        senderId: user.id,
        content: messageContent,
        username: user.username,
        createdAt: new Date(),
        id: Date.now().toString(),
      }
      // await roomStore.addMessageToRoom(roomId.value, newMessage)
      messages.value.push(newMessage)
    }
  }
  catch {
    console.error('Error sending message:', error)
  }
}
onMounted(() => {
  emitter.on(listEvents.closeQueueDrawer, closeSidebar)
})
onUnmounted(() => {
  emitter.off(listEvents.closeQueueDrawer, closeSidebar)
})
</script>

<template>
  <div class="h-full relative overflow-y-hidden">
    <RoomHeader
      v-if="roomData"
      class="absolute left-0 top-0 w-full z-10"
      :name="roomData.name"
      :is-sidebar-visible="isSidebarVisible"
      :active-tab="activeTab"
      @toggle-sidebar="toggleSidebar"
      @set-active-tab="setActiveTab"
    />
    <template v-else>
      <p>Loading room details...</p>
    </template>
    <Chat
      :messages="messages"
      :class="roomQueueStore.currentSong ? 'pt-36' : 'pt-16'"
      :is-sidebar-visible="isSidebarVisible"
      :user-id="userId"
      @message="handleMessage"
    />
  </div>
  <Drawer
    v-if="roomData"
    v-model="isSidebarVisible"
  >
    <MusicList v-if="activeTab === 'queue'" :room-id="roomId" />
    <SearchInRoom
      v-else-if="activeTab === 'music'"
      :room-id="roomId"
    />
    <FriendList v-else-if="activeTab === 'friends'" />
  </Drawer>
</template>
