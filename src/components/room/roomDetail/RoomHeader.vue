<script setup>
import MusicPlayer from '@/components/room/roomDetail/sidebarDetail/MusicPlayer.vue'
import { useRoomQueue } from '@/stores/room-queue'

const props = defineProps({
  name: String,
  isSidebarVisible: Boolean,
  activeTab: String,
})

const emit = defineEmits(['toggle-sidebar', 'set-active-tab'])
const roomQueueStore = useRoomQueue()
function handleButtonClick(tab) {
  if (props.isSidebarVisible) {
    emit('set-active-tab', tab)
  }
  else {
    emit('toggle-sidebar')
    emit('set-active-tab', tab)
  }
}
</script>

<template>
  <div class="room-header" :class="[{ 'room-header-expanded': !isSidebarVisible }]">
    <div
      class="h-[4rem] w-full bg-border  xl:px-8 px-4 xl:text-xl text-sm flex justify-between items-center"
    >
      <div class="font-bold text-primary text-xl w-40 truncate">
        {{ props.name }}
      </div>
      <div
        class="max-lg:hidden flex items-center h-10 gap-2.5 -ml-10"
      >
        <img
          v-lazy="roomQueueStore.currentSong.anh"
          alt=""
          class="w-10 h-10 rounded-lg object-cover"
        >
        <div class="song-meta w-full max-w-36">
          <p class="title text-sm truncate font-semibold">
            {{ roomQueueStore.currentSong.ten_bai_hat }}
          </p>
          <p class="artist text-xs truncate text-secondary-foreground">
            {{ roomQueueStore.currentSong.ten_ca_si }}
          </p>
        </div>
      </div>
      <div class="btn-sidebar min-w-24">
        <button class="btn-music-list" :class="{ 'text-primary': props.activeTab === 'queue' && isSidebarVisible }" @click="handleButtonClick('queue')">
          <Icon name="IconQueue" class="btn btn-music-list" />
        </button>
        <button class="btn-music-list" :class="{ 'text-primary': props.activeTab === 'music' && isSidebarVisible }" @click="handleButtonClick('music')">
          <Icon name="IconMusic" class="btn btn-music-list" />
        </button>
        <button class="btn-room-friends" :class="{ 'text-primary': props.activeTab === 'friends' && isSidebarVisible }" @click="handleButtonClick('friends')">
          <Icon name="IconListFriend" class="btn" />
        </button>
      </div>
    </div>
    <div
      class="w-full"
    >
      <MusicPlayer />
    </div>
  </div>
</template>

<style scoped>
.room-header {
  width: calc(100% - 21.75rem);
  transition: width 0.3s ease-in-out;
}
.room-header-expanded {
  width: 100%;

}

.btn {
  width: 1.5rem;
  height: 1.5rem;
}
.btn-music-list {
  margin-right: 0.3rem;
}
@media (max-width: 768px) {
  .room-header {
    width: 100%;
  }
}
</style>
