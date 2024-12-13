<script setup>
import AppSideBarItem from '@/components/layout/SideBar/AppSideBarItem.vue'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import Input from '@/components/ui/input/Input.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import Separator from '@/components/ui/separator/Separator.vue'
import { useRoomStore } from '@/stores/room'
import { useRouter } from 'vue-router'

const router = useRouter()
const data = ref({
  id: 8,
  icon: 'IconDoor',
  title: 'Your Room',
  url: '/room',
  type: 'button',
})

const isOpen = ref(false)
const classAnimate = ref('')
watch(isOpen, (value) => {
  classAnimate.value = value ? 'animate-rotate-up' : 'animate-rotate-down'
})

const roomStore = useRoomStore()
const roomName = ref('')

onMounted(async () => {
  try {
    await roomStore.getAllRooms()
  }
  catch (err) {
    console.log(err)
  }
})
const rooms = ref([])
watchEffect(() => {
  rooms.value = roomStore.rooms
})
const listRoom = computed(() => {
  return rooms.value
})
function handleRoomClick(roomId) {
  roomStore.getRoomById(roomId)
  router.push(`/room/${roomId}`)
}
</script>

<template>
  <Collapsible v-model:open="isOpen" class="space-y-2">
    <CollapsibleTrigger as-child>
      <div
        class="flex items-center justify-between space-x-4 pr-4 cursor-pointer"
      >
        <AppSideBarItem v-bind="data" style="padding-left: 0" />
        <Icon name="IconArrowDown" :class="classAnimate" />
      </div>
    </CollapsibleTrigger>
    <CollapsibleContent class="space-y-2 py-2 px-4">
      <div class="relative w-full max-w-sm items-center">
        <Input
          id="find"
          v-model="roomName"
          type="text"
          placeholder="Search..."
          class="pl-10"
        />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center h-10 pl-4 pr-2"
        >
          <Icon name="IconSearch" class="w-4 text-white" />
        </span>
        <Separator class="my-2" />
      </div>
      <ScrollArea class="w-full h-36">
        <div class="flex flex-col gap-2 px-4">
          <template v-for="room in listRoom" :key="room.id">
            <div
              class="rounded-md border px-4 py-3 font-mono text-sm cursor-pointer"
              @click="handleRoomClick(room.id)"
            >
              {{ room.name }}
            </div>
          </template>
        </div>
      </ScrollArea>
    </CollapsibleContent>
  </Collapsible>
</template>
