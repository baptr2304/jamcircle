<script setup>
import IconBtnMusicList from '@/components/icons/IconBtnMusicList.vue'
import IconListFriend from '@/components/icons/IconListFriend.vue'

const props = defineProps({
  name: String,
  isSidebarVisible: Boolean,
  activeTab: String,
})
const emit = defineEmits(['toggle-sidebar', 'set-active-tab'])
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
      <div class="room-name">
        {{ props.name }}
      </div>
      <div class="btn-sidebar"> 
        <button class="btn-music-list" :class="{ 'text-primary': props.activeTab === 'music' }" @click="handleButtonClick('music')">
          <IconBtnMusicList class="btn btn-music-list" />
        </button>
        <button class="btn-room-friends" :class="{ 'text-primary': props.activeTab === 'friends' }" @click="handleButtonClick('friends')">
          <IconListFriend class="btn" />
        </button>
      </div>
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
.room-name {
  font-weight: 700;
  color: hsl(var(--primary));
  font-size: 1.5rem;
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
