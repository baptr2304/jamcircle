<script setup>
import PlaylistHeader from '@/components/playlist/PlaylistHeader.vue'
import CreateRoomDialog from '@/components/room/CreateRoomDialog.vue'

import JoinRoomDialog from '@/components/room/JoinRoomDialog.vue'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Separator from '@/components/ui/separator/Separator.vue'
import { toast } from '@/components/ui/toast'
import { useRoomStore } from '@/stores/room'
import { useRouter } from 'vue-router'

const roomStore = useRoomStore()
const router = useRouter()
const rooms = ref([])
const isCreateRoomOpen = ref(false)
const isJoinRoomOpen = ref(false)
const searchValue = ref('')
function openCreateRoom() {
  isCreateRoomOpen.value = true
}
function openJoinRoom() {
  isJoinRoomOpen.value = true
}

const listRoom = computed(() => {
  return rooms.value.filter((room) => {
    return room.ten_phong.toLowerCase().includes(searchValue.value.toLowerCase())
  })
})

onMounted(async () => {
  rooms.value = await roomStore.listRoom()
})

async function handleCreateRoom(roomName) {
  const { phong_nghe_nhac } = await roomStore.createRoom(roomName)
  toast({
    title: 'Thành công',
    description: 'Phòng nghe nhạc đã được tạo.',
    duration: 5000,
  })
  router.push(`/room/${phong_nghe_nhac.id}`)
  isCreateRoomOpen.value = false
}

async function handleJoinRoom(roomId) {
  await roomStore.requestJoinRoom(roomId)
  toast({
    title: 'Request sent!',
    description: 'Your request to join the room has been sent.',
    duration: 5000,
  })
  isJoinRoomOpen.value = false
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
        Tham gia phòng nghe nhạc
      </Button>
      <Button
        class="text-foreground rounded-full"
        @click="openCreateRoom"
      >
        <Icon name="IconJam" class="w-6 h-6" />
        Tạo phòng nghe nhạc
      </Button>
    </div>
  </div>
  <div
    v-if="rooms.length !== 0"
    class="flex flex-col gap-2 px-4"
  >
    <div class="relative w-full max-w-sm">
      <Input
        id="find"
        v-model="searchValue"
        type="text"
        placeholder="Tìm kiếm..."
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
    <div
      v-if="listRoom.length !== 0"
      class="flex flex-col gap-2 w-full h-56 overflow-y-auto scrollbar"
    >
      <template v-for="room in listRoom" :key="room.id">
        <RouterLink
          :to="`/room/${room.id}`"
          class="rounded-md border px-4 py-3 font-mono text-sm cursor-pointer"
        >
          {{ room.ten_phong }}
        </RouterLink>
      </template>
    </div>
    <div v-else>
      <p class="text-center">
        Không tìm thấy phòng nào.
      </p>
    </div>
  </div>
  <div v-else>
    <p class="text-center">
      Không có phòng nào.
    </p>
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
