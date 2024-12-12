<route>
     {
      meta: {
          layout: "default",
          title: "Room Detail",
          name: "Room Detail",
      },
      path: "/room/:id"
  }
</route>
<script setup>
import Chat from "@/components/room/roomDetail/roomChat/Chat.vue";
import RoomHeader from "@/components/room/roomDetail/RoomHeader.vue";
import FriendList from "@/components/room/roomDetail/sidebarDetail/FriendList.vue";
import MusicList from "@/components/room/roomDetail/sidebarDetail/MusicList.vue";
import { useRoomStore } from "@/stores/room";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";
import Drawer from "@/components/base/Drawer.vue";
const roomStore = useRoomStore();
const route = useRoute();
const roomId = computed(() => route.params.id);
const roomData = computed(() => roomStore.currentRoom);
const listSongs = computed(() => roomStore.currentRoom?.queue || []);
const currentUser = useUserStore();
const user = currentUser.user;
const userId = user.id;
const messages = ref([]);
const isSidebarVisible = ref(true);
const activeTab = ref("music");
const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};
const setActiveTab = (tab) => {
  activeTab.value = tab;
};
watch(
  roomId,
  async (newRoomId) => {
    try {
      await roomStore.getRoomById(newRoomId);
      messages.value = roomStore.currentRoom.messages;
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  },
  { immediate: true }
);

const handleMessage = async (messageContent) => {
  try {
    if (messageContent.trim()) {
      const newMessage = {
        senderId: user.id,
        content: messageContent,
        username: user.username,
        createdAt: new Date(),
        id: Date.now().toString(),
      };
      await roomStore.addMessageToRoom(roomId.value, newMessage);
    }
  } catch {
    console.error("Error sending message:", error);
  }
};
</script>

<template>
  <div class="">
    <div v-if="roomData">
      <RoomHeader
        :name="roomData.name"
        @toggle-sidebar="toggleSidebar"
        :is-sidebar-visible="isSidebarVisible"
        @set-active-tab="setActiveTab"
      />
    </div>
    <div v-else>
      <p>Loading room details...</p>
    </div>
    <Drawer v-model="isSidebarVisible" >
      <div v-if="activeTab === 'music'">
        <MusicList :listSongs="listSongs" :roomId="roomId" />
      </div>
      <div v-else-if="activeTab === 'friends'">
        <FriendList />
      </div>
    </Drawer>
    <Chat
      :messages="messages"
      :isSidebarVisible="isSidebarVisible"
      @message="handleMessage"
      :userId="userId"
    />
  </div>
</template>
