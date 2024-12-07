<script setup>
import IconCloseBtn from "@/components/icons/IconCloseBtn.vue";
import FriendList from "./sidebarDetail/FriendList.vue";
import MusicList from "./sidebarDetail/MusicList.vue";

const props = defineProps({
  isSidebarVisible: Boolean,
  activeTab: String,
  listSongs: {
    type: Array,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },

});

const emit = defineEmits(["toggle-sidebar"]);

</script>
<template>
  <Transition name="sidebar-slide">
    <div
      v-if="isSidebarVisible"
      class="bg-card w-[21.75rem] h-full absolute right-0 top-0"
    >
      <div class="flex justify-end items-center mr-6 mb-2 mt-2">
        <button @click="$emit('toggle-sidebar')" class="btn-close">
          <IconCloseBtn class="btn-close w-4 h-4" />
        </button>
      </div>
      <div v-if="activeTab === 'music'">
        <MusicList :listSongs="listSongs" :roomId="roomId" />
      </div>
      <div v-else-if="activeTab === 'friends'">
        <FriendList />
      </div>
    </div>
  </Transition>
</template>
<style scoped>
.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
  transition: transform 0.3s;
}
.sidebar-slide-enter-from,
.sidebar-slide-leave-to {
  transform: translateX(21.75rem);
}
.sidebar-slide-enter-to,
.sidebar-slide-leave-from {
  transform: translateX(0);
}
</style>
