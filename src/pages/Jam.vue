<script setup>
import PlaylistHeader from '@/components/playlist/PlaylistHeader.vue'
import CreateRoomDialog from '@/components/room/CreateRoomDialog.vue'

import JoinRoomDialog from '@/components/room/JoinRoomDialog.vue'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import Separator from '@/components/ui/separator/Separator.vue'
import { usePlaylistStore } from '@/stores/playlist'
import { useRoomStore } from '@/stores/room'
import { useRouter } from 'vue-router'

const playlistStore = usePlaylistStore()
onMounted(async () => {
  await playlistStore.getMyPlaylists()
})

const isCreateRoomOpen = ref(false)
const isJoinRoomOpen = ref(false)
function openCreateRoom() {
  isCreateRoomOpen.value = true
}
function openJoinRoom() {
  isJoinRoomOpen.value = true
}

const router = useRouter()
const isOpen = ref(false)
const classAnimate = ref('')
watch(isOpen, (value) => {
  classAnimate.value = value ? 'animate-rotate-up' : 'animate-rotate-down'
})

const roomStore = useRoomStore()
const roomName = ref('')

onMounted(async () => {
  await roomStore.getAllRooms()
})
const rooms = ref([])
watchEffect(() => {
  rooms.value = roomStore.rooms
})
const listRoom = computed(() => {
  return rooms.value.filter((room) => {
    return room.name.toLowerCase().includes(roomName.value.toLowerCase())
  })
})
function handleRoomClick(roomId) {
  roomStore.getRoomById(roomId)
  router.push(`/room/${roomId}`)
}
</script>

<template>
  <div class="relative">
    <PlaylistHeader
      class="max-sm:hidden"
      icon="IconMusicSolid" title="Jam"
    />
    <div class="flex gap-2 px-4 py-2 justify-center">
      <Button
        variant="secondary"
        class="text-foreground rounded-full"
        @click="openJoinRoom"
      >
        <Icon name="IconJoin" class="w-6 h-6" />
        Join a room
      </Button>
      <Button
        class="text-foreground rounded-full"
        @click="openCreateRoom"
      >
        <Icon name="IconJam" class="w-6 h-6" />
        Create a room
      </Button>
    </div>
  </div>
  <div class="flex flex-col gap-2 px-4">
    <div class="relative w-full max-w-sm">
      <Input
        id="find"
        v-model="roomName"
        type="text"
        placeholder="Search..."
        class="pl-10"
        autocomplete="off"
      />
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center h-10 pl-4 pr-2"
      >
        <Icon name="IconSearch" class="w-4 text-white" />
      </span>
      <Separator class="my-2" />
    </div>
    <div class="flex flex-col gap-2 w-full h-56 overflow-y-auto scrollbar">
      <template v-for="room in listRoom" :key="room.id">
        <div
          class="rounded-md border px-4 py-3 font-mono text-sm cursor-pointer"
          @click="handleRoomClick(room.id)"
        >
          {{ room.name }}
        </div>
      </template>
    </div>
  </div>

  <CreateRoomDialog
    v-model:open="isCreateRoomOpen"
    @create="handleCreateRoom"
  />
  <JoinRoomDialog
    v-model:open="isJoinRoomOpen"
    @join="handleJoinRoom"
  />
</template>
