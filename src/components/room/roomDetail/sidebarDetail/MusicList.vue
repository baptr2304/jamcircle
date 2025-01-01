<script setup>
import SongListItem from '@/components/common/SongListItem.vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useRoomQueue } from '@/stores/room-queue'
import { useWebSocketStore } from '@/stores/websocket'

const props = defineProps({
  userInRoom: {
    type: Object,
    required: true,
  },
})
const webSocketStore = useWebSocketStore()
const roomQueueStore = useRoomQueue()
async function handleRemoveSong(song) {
  if (props.userInRoom?.quyen === 'thanh_vien')
    return
  webSocketStore.socket.send(
    JSON.stringify({
      type: 'danh_sach_phat',
      action: 'xoa_bai_hat',
      data: {
        thanh_vien_phong_id: props.userInRoom.id,
        so_thu_tu: song.so_thu_tu,
      },
    }),
  )
}

async function handlePlaySong(song) {
  if (props.userInRoom?.quyen === 'thanh_vien')
    return
  webSocketStore.socket.send(
    JSON.stringify(
      {
        type: 'trang_thai_phat',
        action: 'phat_bai_hat',
        data: {
          thanh_vien_phong_id: props.userInRoom.id,
          trang_thai_phat: 'DangPhat',
          bai_hat_id: song.id,
          so_thu_tu: song.so_thu_tu,
          thoi_gian_bat_dau: 0,
        },
      },
    ),
  )
}
</script>

<template>
  <div class="w-full h-[calc(100%-3rem)] flex justify-center">
    <div class="w-full flex flex-col">
      <h3 class="mx-4 mt-3 py-2 text-xl">
        Hàng đợi
      </h3>

      <div
        class="w-full h-[calc(100%-3rem)] overflow-y-auto scrollbar"
      >
        <SongListItem
          v-for="song in roomQueueStore.playlist"
          :key="song.so_thu_tu"
          :song="song"
          :is-playing="song.so_thu_tu === roomQueueStore.currentSong?.so_thu_tu"
          @handle-click="handlePlaySong(song)"
        >
          <template
            v-if="props.userInRoom?.quyen !== 'thanh_vien'"
            #action
          >
            <div class="w-[20%]">
              <Popover>
                <PopoverTrigger>
                  <Icon
                    name="IconEllipsis"
                    class="w-10 h-6  cursor-pointer"
                  />
                </PopoverTrigger>
                <PopoverContent class="w-25">
                  <button @click="handleRemoveSong(song)">
                    Xóa khỏi hàng đợi
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          </template>
        </SongListItem>
      </div>
    </div>
  </div>
</template>
