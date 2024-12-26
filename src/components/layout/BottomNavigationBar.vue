<script setup>
import AppSideBarItem from '@/components/layout/SideBar/AppSideBarItem.vue'
import { useRoomStore } from '@/stores/room'
import { useUserStore } from '@/stores/user'
import { listEvents } from '@/utils/enum'
import emitter from '@/utils/eventBus'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)
const data = ref([
  {
    id: 0,
    icon: 'IconQueue',
    title: 'Queue',
    type: 'button',
  },
  {
    id: 1,
    icon: 'IconLibrary',
    title: 'Playlist',
    url: '/playlist',
    content: 'Login to view your playlist',
    requiredAuthen: true,
  },
  {
    id: 2,
    icon: 'IconHome',
    title: 'Home',
    url: '/home',
  },
  {
    id: 3,
    icon: 'IconJam',
    title: 'Jam',
    url: '/jam',
    content: 'Login to start a jam',
    requiredAuthen: true,
  },
  {
    id: 4,
    icon: 'IconMusic',
    title: 'Create Song',
    url: '/song/create',
    content: 'Login to create and share song',
    requiredAuthen: true,
  },
])
const roomStore = useRoomStore()
async function handleRoomCreation(roomName) {
  isLoading.value = true
  const userStore = useUserStore()
  try {
    await roomStore.createNewRoom({
      name: roomName,
      hostId: userStore.user?.id,
    })
    if (roomStore.currentRoom?.id) {
      router.push(`/room/${roomStore.currentRoom.id}`)
    }
    else {
      console.error('Failed to create room')
    }
  }
  catch (err) {
    console.error(err)
  }
  finally {
    isLoading.value = false
  }
}
function toggleOpenDrawer() {
  emitter.emit(listEvents.toggleQueueDrawer)
}
</script>

<template>
  <div class="flex justify-around h-20 ">
    <AppSideBarItem
      v-for="item in data"
      :key="item.id"
      v-bind="item"
      text-style="text-xs text-center font-normal"
      class="flex-col item"
      @create-room="handleRoomCreation"
      @toggle-queue="toggleOpenDrawer"
    />
  </div>
</template>

<style scoped>
.item {
  padding: 0.25rem 0.5rem;
}
</style>
