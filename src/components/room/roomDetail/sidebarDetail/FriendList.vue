<script setup>
import Icon from '@/components/base/Icon.vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue'
import { useRoomStore } from '@/stores/room'

const roomStore = useRoomStore()
const room = roomStore.currentRoom
const inviteLinkRef = ref(null)

function copyInviteLink() {
  if (inviteLinkRef.value) {
    navigator.clipboard.writeText(room.inviteLink)
  }
}
</script>

<template>
  <ScrollArea class="h-[70vh] sm:h-[70vh] md:h-[90vh] xl:h-[90vh]">
    <div class="flex flex-col justify-center items-center">
      <div class="w-[90%]">
        <h1 class="text-primary text-2xl font-bold">
          Information
        </h1>
        <div class="flex items-center">
          <div class="text-xl mr-2 font-bold">
            {{ room.name }}
          </div>
          <Icon name="IconPen" class="w-4 h-4" />
        </div>
        <div class="mt-4">
          <div class="flex items-center">
            <h3 class="text-lg font-bold mr-2">
              Room ID
            </h3>
            <input
              type="text"
              class="w-[70%]  border-input rounded-md p-2 bg-border opacity-50 text-sm border-0 focus:outline-none focus:ring-0"
              :value="room.id"
              readonly
            >
          </div>
          <div>
            <h1 class="mt-6 mb-2 text-primary text-xl font-bold ">
              Invite Link
            </h1>
            <div class="flex items-center">
              <input
                :ref="(el) => (inviteLinkRef = el)"
                type="text"
                class="w-full border-input rounded-md p-2 bg-border opacity-50 mr-2 text-sm border-0 focus:outline-none focus:ring-0"
                :value="room.inviteLink"
                readonly
                @focus="$event.target.select()"
              >
              <Popover>
                <PopoverTrigger>
                  <Icon name="IconCopy" class="w-6 h-6 cursor-pointer" @click="copyInviteLink" />
                </PopoverTrigger>
                <PopoverContent class="w-25 text-muted-foreground" readonly>
                  Copied!
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div
            class="w-full mt-2 text-sm border-input rounded-md p-3 bg-border"
          >
            By default members that join channel will be admin(can change and
            play songs). <b style="color: yellowgreen;">Host</b> can demote them to member.
          </div>
          <h1 class="mt-6 text-primary text-xl font-bold">
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
        </div>
      </div>
    </div>
  </ScrollArea>
</template>
