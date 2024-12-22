<script setup>
import Icon from '@/components/base/Icon.vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRoomStore } from '@/stores/room'
import { useQRCode } from '@vueuse/integrations/useQRCode'

const roomStore = useRoomStore()
const room = roomStore.currentRoom
const qrcode = useQRCode(roomStore.currentRoom.inviteLink)

function copyInviteLink(value) {
  navigator.clipboard.writeText(value)
}
</script>

<template>
  <ScrollArea class="h-[70vh] sm:h-[70vh] md:h-[90vh] xl:h-[90vh]">
    <div class="flex flex-col justify-center items-center">
      <div class="w-[90%]">
        <h1 class="text-primary text-2xl font-bold">
          Information
        </h1>
        <div class="flex items-center py-2 mb-2">
          <div class="text-xl mr-2 font-bold">
            {{ room.name }}
          </div>
          <Icon name="IconPen" class="w-4 h-4" />
        </div>

        <Tabs default-value="room-id" class="w-full">
          <TabsList>
            <TabsTrigger value="room-id">
              Room ID
            </TabsTrigger>
            <TabsTrigger value="room-link">
              Room Link
            </TabsTrigger>
            <TabsTrigger value="room-qr">
              Room QR
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
                :value="room.inviteLink"
                readonly
                @focus="$event.target.select()"
              >
              <Popover>
                <PopoverTrigger>
                  <Icon name="IconCopy" class="w-6 h-6 cursor-pointer" @click="copyInviteLink(room.inviteLink)" />
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
            <TabsList>
              <TabsTrigger value="members">
                Members
              </TabsTrigger>
              <TabsTrigger value="requests">
                Requests
              </TabsTrigger>
            </TabsList>
            <TabsContent value="members">
              <div class="flex flex-col mt-4 max-h-80 overflow-y-auto scrollbar">
                <div
                  v-for="member in room.members"
                  :key="member.id"
                  class="flex items-center justify-between border border-input rounded-md p-2 bg-border mb-2"
                >
                  <div class="flex items-center">
                    <img
                      v-lazy="member.avatar"
                      alt="avatar"
                      class="w-8 h-8 rounded-full"
                    >
                    <div class="ml-2">
                      {{ member.username }}
                    </div>
                  </div>
                  <div class="flex items-center">
                    <div class="text-xs text-gray-400 mr-2">
                      {{ member.role }}
                    </div>
                    <Popover>
                      <PopoverTrigger>
                        <Icon name="IconPen" class="w-4 h-4 cursor-pointer" />
                      </PopoverTrigger>
                      <PopoverContent class="w-25 text-muted-foreground flex flex-col items-center">
                        <div class="border-b pb-2">
                          Admin
                        </div>
                        <div class="">
                          Member
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="requests">
              <div class="flex flex-col mt-4 max-h-80 overflow-y-auto scrollbar">
                <div
                  v-for="member in room.members"
                  :key="member.id"
                  class="flex items-center justify-between border border-input rounded-md p-2 bg-border mb-2"
                >
                  <div class="flex items-center">
                    <img
                      v-lazy="member.avatar"
                      alt="avatar"
                      class="w-8 h-8 rounded-full"
                    >
                    <div class="ml-2 w-28 truncate">
                      {{ member.username }}
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <button
                      class="rounded-full flex items-center justify-center bg-destructive p-2.5"
                    >
                      <Icon name="IconCloseBtn" class="w-3 h-3 text-white" />
                    </button>
                    <button
                      class="rounded-full flex items-center justify-center bg-primary p-2.5"
                    >
                      <Icon name="IconCheck" class="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  </ScrollArea>
</template>
