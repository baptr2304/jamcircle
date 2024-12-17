<script setup>
import IconCopy from '@/components/icons/IconCopy.vue'
import IconPen from '@/components/icons/IconPen.vue'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { useRoomStore } from '@/stores/room'

const roomStore = useRoomStore()
const room = roomStore.currentRoom
</script>

<template>
  <ScrollArea class="h-[70vh] sm:h-[70vh] md:h-[90vh] xl:h-[90vh]">
    <div class="flex flex-col justify-center items-center">
      <div class="w-[90%]">
        <h1 class="text-primary text-2xl">
          Information
        </h1>
        <div class="flex items-center">
          <div class="text-xl mr-2 font-bold">
            {{ room.name }}
          </div>
          <IconPen class="w-4 h-4" />
        </div>
        <div class="mt-4">
          <div class="flex items-center">
            <h3 class="text-lg font-bold mr-2">
              Room ID
            </h3>
            <input
              type="text"
              class="w-[70%] border border-input rounded-md p-2 bg-border opacity-50"
              :value="room.id"
              readonly
            >
          </div>
          <div>
            <h1 class="mt-6 mb-2 text-primary text-xl">
              Invite Link
            </h1>
            <div class="flex items-center">
              <input
                type="text"
                class="w-full border border-input rounded-md p-2 bg-border opacity-50 mr-2"
                :value="room.inviteLink"
                readonly
              >
              <IconCopy class="w-6 h-6" />
            </div>
          </div>
          <div
            class="w-full mt-4 text-sm border-input rounded-md p-2 bg-border"
          >
            By default members that join channel will be admin(can change and
            play songs). Creator can demote them to member.
          </div>
          <h1 class="mt-6 text-primary text-xl">
            Member
          </h1>
          <div class="flex flex-col mt-4">
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
                <IconPen class="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ScrollArea>
</template>
