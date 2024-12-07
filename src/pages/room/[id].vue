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
import RoomSideBar from "@/components/room/roomDetail/RoomSideBar.vue";
import { useRoomStore } from "@/stores/room";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";
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
    <RoomSideBar
      :isSidebarVisible="isSidebarVisible"
      @toggle-sidebar="toggleSidebar"
      :activeTab="activeTab"
      :listSongs="listSongs"
      :roomId="roomId"
    />
    <Chat
      :messages="messages"
      :isSidebarVisible="isSidebarVisible"
      @message="handleMessage"
      :userId="userId"
    />
  </div>
</template>
