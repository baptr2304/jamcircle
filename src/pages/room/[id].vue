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
import { toast } from '@/components/ui/toast'
import { useRoomStore } from '@/stores/room'
import { useRoomQueue } from '@/stores/room-queue'
import { useUserStore } from '@/stores/user'
import { listEvents } from '@/utils/enum'
import emitter from '@/utils/eventBus'

const roomStore = useRoomStore()
const roomQueueStore = useRoomQueue()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
if (!userStore.isAuthenticated) {
  router.push('/home')
}

const messages = ref([])
const isSidebarVisible = ref(true)
const activeTab = ref('friends')
const roomData = ref(null)
const members = ref([])
const requests = ref([])
const roomId = route.params.id

const userInRoom = computed(() => {
  return members.value.find(member => member.nguoi_dung_id === userStore.user.id)
})

function toggleSidebar() {
  isSidebarVisible.value = !isSidebarVisible.value
}

async function fetchRoomData() {
  try {
    roomData.value = await roomStore.getDetailRoom(roomId)
  }
  catch (error) {
    const message = error.response.data.detail || 'An error occurred while fetching room details.'
    toast({
      title: 'Uh oh! Something went wrong.',
      description: message,
      variant: 'destructive',
      duration: 5000,
    })
    router.push('/jam')
  }
}

async function fetchMembersData() {
  try {
    members.value = await roomStore.getRoomMembers(roomId)
    if (userInRoom.value?.quyen !== 'thanh_vien')
      requests.value = await roomStore.getListRequestJoinRoom(roomId)
  }
  catch {
    await roomStore.requestJoinRoom(roomId)
    toast({
      title: 'Request sent!',
      description: 'Your request to join the room has been sent.',
      duration: 5000,
    })
    router.push('/jam')
  }
}

function closeSidebar() {
  isSidebarVisible.value = false
}

function setActiveTab(tab) {
  activeTab.value = tab
}

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
onMounted(async () => {
  await fetchRoomData()
  fetchMembersData()
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
      :name="roomData.ten_phong"
      :is-sidebar-visible="isSidebarVisible"
      :active-tab="activeTab"
      :user-in-room="userInRoom"
      @toggle-sidebar="toggleSidebar"
      @set-active-tab="setActiveTab"
    />
    <template v-else>
      <p>Loading room details...</p>
    </template>
    <!-- <Chat
      :messages="messages"
      :class="roomQueueStore.currentSong ? 'pt-36' : 'pt-16'"
      :is-sidebar-visible="isSidebarVisible"
      :user-id="userId"
      @message="handleMessage"
    /> -->
  </div>
  <Drawer
    v-if="roomData"
    v-model="isSidebarVisible"
  >
    <MusicList
      v-if="activeTab === 'queue'"
      :room-id="roomId"
    />
    <SearchInRoom
      v-else-if="activeTab === 'music' && userInRoom?.quyen !== 'thanh_vien'"
      :room-id="roomId"
    />
    <FriendList
      v-else-if="activeTab === 'friends'"
      :user-in-room="userInRoom"
      :requests="requests"
      :members="members"
      :room="roomData"
      @fetch-data="fetchMembersData"
    />
  </Drawer>
</template>
