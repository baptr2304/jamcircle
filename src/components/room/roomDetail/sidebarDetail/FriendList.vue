<script setup>
import Icon from '@/components/base/Icon.vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import Separator from '@/components/ui/separator/Separator.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useConfirmStore } from '@/stores/confirm'
import { useRoomStore } from '@/stores/room'
import { listRoles } from '@/utils/enum'
import { useQRCode } from '@vueuse/integrations/useQRCode'

const { room, members, requests, userInRoom } = defineProps({
  room: {
    type: Object,
    required: true,
  },
  members: {
    type: Array,
    required: true,
  },
  requests: {
    type: Array,
    required: true,
  },
  userInRoom: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['fetchData'])
const confirmStore = useConfirmStore()
const roomStore = useRoomStore()
const link = window.location.href
const qrcode = useQRCode(link)

function copyInviteLink(value) {
  navigator.clipboard.writeText(value)
}
async function hanldeAcceptRequest(id, accept) {
  await roomStore.acceptJoinRoom(id, accept)
  emit('fetchData')
}
async function handleDeleteMember(id) {
  const result = await confirmStore.showConfirmDialog({
    title: 'Delete member',
    message: 'Are you sure you want to delete this member?',
  })
  if (!result)
    return
  await roomStore.deleteMember(id)
  emit('fetchData')
}

async function updateRole(id, role) {
  await roomStore.updatePermission(id, role)
  emit('fetchData')
}
</script>

<template>
  <div class="flex flex-col items-center h-full">
    <div class="w-[90%]">
      <h1 class="text-primary text-2xl font-bold">
        Information
      </h1>
      <div class="flex items-center py-2 mb-2">
        <div class="text-xl mr-2 font-bold">
          {{ room.ten_phong }}
        </div>
        <Icon name="IconPen" class="w-4 h-4" />
      </div>

      <Tabs default-value="room-link" class="w-full">
        <TabsList class="w-full">
          <TabsTrigger value="room-link">
            Room Link
          </TabsTrigger>
          <TabsTrigger value="room-qr">
            Room QR
          </TabsTrigger>
          <TabsTrigger value="room-id">
            Room ID
          </TabsTrigger>
        </TabsList>
        <TabsContent value="room-id">
          <div class="flex items-center">
            <input
              type="text"
              class="w-full border-input rounded-md p-2 bg-border opacity-50 mr-2 text-sm border-0 focus:outline-none focus:ring-0"
              :value="room.id"
              readonly
              @focus="$event.target.select()"
            >
            <Popover>
              <PopoverTrigger>
                <Icon name="IconCopy" class="w-6 h-6 cursor-pointer" @click="copyInviteLink(room.id)" />
              </PopoverTrigger>
              <PopoverContent class="w-25 text-muted-foreground" readonly>
                Copied!
              </PopoverContent>
            </Popover>
          </div>
        </TabsContent>
        <TabsContent value="room-link">
          <div class="flex items-center">
            <input
              type="text"
              class="w-full border-input rounded-md p-2 bg-border opacity-50 mr-2 text-sm border-0 focus:outline-none focus:ring-0"
              :value="link"
              readonly
              @focus="$event.target.select()"
            >
            <Popover>
              <PopoverTrigger>
                <Icon name="IconCopy" class="w-6 h-6 cursor-pointer" @click="copyInviteLink(link)" />
              </PopoverTrigger>
              <PopoverContent class="w-25 text-muted-foreground" readonly>
                Copied!
              </PopoverContent>
            </Popover>
          </div>
        </TabsContent>
        <TabsContent value="room-qr">
          <div class="flex justify-center">
            <img v-lazy="qrcode" alt="QR Code">
          </div>
        </TabsContent>
      </Tabs>

      <div class="my-4">
        <div
          class="w-full my-2 text-sm border-input rounded-md p-3 bg-border"
        >
          By default members that join channel will be admin(can change and
          play songs). <b style="color: yellowgreen;">Host</b> can demote them to member.
        </div>
        <Tabs default-value="members" class="w-full">
          <TabsList class="w-full">
            <TabsTrigger value="members">
              Members ({{ members.length }})
            </TabsTrigger>
            <TabsTrigger
              v-if="userInRoom?.quyen !== 'thanh_vien'"
              value="requests"
            >
              Requests ({{ requests.length }})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="members">
            <div
              v-if="members.length"
              class="flex flex-col mt-4 max-h-80 overflow-y-auto scrollbar"
            >
              <div
                v-for="member in members"
                :key="member.id"
                class="flex items-center justify-between border border-input rounded-md p-2 bg-border mb-2"
              >
                <div class="flex items-center">
                  <img
                    v-lazy="member.anh_dai_dien"
                    alt="avatar"
                    class="w-8 h-8 rounded-full"
                  >
                  <div class="ml-2">
                    {{ member.ho_ten }}
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="text-xs text-gray-400 mr-2">
                    {{ listRoles[member.quyen] }}
                  </div>
                  <Popover
                    v-if="userInRoom?.quyen !== 'thanh_vien'"
                  >
                    <PopoverTrigger>
                      <Icon name="IconPen" class="w-8 h-8 p-2 text-white cursor-pointer hover:bg-popover rounded-sm" />
                    </PopoverTrigger>
                    <PopoverContent class="w-24 p-2 text-muted-foreground text-sm flex flex-col items-center">
                      <div class="p-2 my-1 cursor-pointer text-center w-full rounded-sm hover:bg-secondary" @click="updateRole(member.id, 'quan_ly')">
                        Admin
                      </div>
                      <Separator />
                      <div
                        class="p-2 my-1 cursor-pointer text-center w-full rounded-sm hover:bg-secondary"
                        @click="updateRole(member.id, 'thanh_vien')"
                      >
                        Member
                      </div>
                      <Separator />
                      <div
                        class="p-2 my-1 cursor-pointer text-center w-full rounded-sm hover:bg-secondary"
                        @click="handleDeleteMember(member.id)"
                      >
                        Delete
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="requests">
            <div
              v-if="requests.length"
              class="flex flex-col mt-4 max-h-80 overflow-y-auto scrollbar"
            >
              <div
                v-for="member in requests"
                :key="member.id"
                class="flex items-center justify-between border border-input rounded-md p-2 bg-border mb-2"
              >
                <div class="flex items-center">
                  <img
                    v-lazy="member.anh_dai_dien"
                    alt="avatar"
                    class="w-8 h-8 rounded-full"
                  >
                  <div class="ml-2 w-28 truncate">
                    {{ member.ho_ten }}
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    class="rounded-full flex items-center justify-center bg-destructive p-2.5"
                    @click="hanldeAcceptRequest(member.id, false)"
                  >
                    <Icon name="IconCloseBtn" class="w-3 h-3 text-white" />
                  </button>
                  <button
                    class="rounded-full flex items-center justify-center bg-primary p-2.5"
                    @click="hanldeAcceptRequest(member.id, true)"
                  >
                    <Icon name="IconCheck" class="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>
            </div>
            <div v-else>
              <p class="text-center text-sm py-4 font-medium">
                No requests to join room
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </div>
</template>
