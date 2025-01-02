<script setup>
import { Progress } from '@/components/ui/progress'
import { useRoomQueue } from '@/stores/room-queue'
import { useWebSocketStore } from '@/stores/websocket'
import { listEvents } from '@/utils/enum'
import emitter from '@/utils/eventBus'
import { formatTime } from '@/utils/format'
import { sleep } from '@/utils/helper'

const { userInRoom } = defineProps({
  userInRoom: Object,
})

const roomQueueStore = useRoomQueue()
const webSocketStore = useWebSocketStore()

const progress = ref(0)
const progressBar = ref(null)
const audio = ref(null)
const isPlaying = ref(false)
const isDragging = ref(false)
const songCurrentTime = ref(0)
const isMuted = ref(false)
const isLoadingSong = ref(false)
let interval
function updateProgress(event) {
  const rect = progressBar.value.getBoundingClientRect()
  if (event.clientX < rect.left) {
    progress.value = 0
    return
  }
  if (event.clientX > rect.right) {
    progress.value = 100
    return
  }
  const offsetX = event.clientX - rect.left
  const width = rect.width
  progress.value = Math.round((offsetX / width) * 100)
}

function handleMouseMove(event) {
  event.preventDefault()
  updateProgress(event)
}

function handleMouseUp() {
  if (userInRoom?.quyen === 'thanh_vien')
    return
  isDragging.value = false
  changeCurrentTime((progress.value / 100) * audio.value.duration)
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

function handleMouseDown(event) {
  if (userInRoom?.quyen === 'thanh_vien')
    return
  isDragging.value = true
  updateProgress(event)
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

async function handlePlay() {
  if (userInRoom?.quyen === 'thanh_vien')
    return
  if (!roomQueueStore.currentSong)
    return
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    webSocketStore.socket.send(
      JSON.stringify(
        {
          type: 'trang_thai_phat',
          action: 'phat_bai_hat',
          data: {
            thanh_vien_phong_id: userInRoom.id,
            trang_thai_phat: 'DangPhat',
            bai_hat_id: roomQueueStore.currentSong.id,
            so_thu_tu: roomQueueStore.currentSong.so_thu_tu,
            thoi_gian_bat_dau: Math.floor(songCurrentTime.value),
          },
        },
      ),
    )
  }
  else {
    webSocketStore.socket.send(
      JSON.stringify(
        {
          type: 'trang_thai_phat',
          action: 'dung_phat',
          data: {
            thanh_vien_phong_id: userInRoom.id,
            trang_thai_phat: 'TamDung',
            bai_hat_id: roomQueueStore.currentSong.id,
            so_thu_tu: roomQueueStore.currentSong.so_thu_tu,
            thoi_gian_ket_thuc: Math.floor(songCurrentTime.value),
          },
        },
      ),
    )
  }
}
function updateTime() {
  if (!audio.value || isDragging.value)
    return
  const { currentTime, duration } = audio.value
  if (audio.value) {
    const { duration } = audio.value
    if (!duration) {
      progress.value = 0
      return
    }
  }
  progress.value = (currentTime / duration) * 100
  songCurrentTime.value = Math.floor(currentTime)
  if (currentTime === duration) {
    nextSong()
  }
}
async function changeCurrentTime(time, type) {
  if (userInRoom?.quyen === 'thanh_vien')
    return
  if (!roomQueueStore.currentSong)
    return
  let udpateTime = audio.value.currentTime
  switch (type) {
    case 'backward':
      udpateTime -= time
      break
    case 'forward':
      udpateTime += time
      break
    default:
      udpateTime = time
      break
  }
  const payload = {
    id: roomQueueStore.currentRoom.id,
    ten_phong: roomQueueStore.currentRoom.ten_phong,
    trang_thai_phat: 'DangPhat',
    thoi_gian_hien_tai_bai_hat: Math.floor(udpateTime),
    so_thu_tu_bai_hat_dang_phat: roomQueueStore.currentSong.so_thu_tu,
  }
  await roomQueueStore.updateRoom(payload)

  webSocketStore.socket.send(
    JSON.stringify(
      {
        type: 'trang_thai_phat',
        action: 'phat_bai_hat',
        data: {
          thanh_vien_phong_id: userInRoom.id,
          trang_thai_phat: 'DangPhat',
          bai_hat_id: roomQueueStore.currentSong.id,
          so_thu_tu: roomQueueStore.currentSong.so_thu_tu,
          thoi_gian_bat_dau: Math.floor(udpateTime),
        },
      },
    ),
  )
}

async function resetControl() {
  try {
    if (!roomQueueStore.currentSong || userInRoom?.quyen === 'thanh_vien')
      return
    await nextTick()
    await sleep(300)
    isPlaying.value = roomQueueStore.currentRoom?.trang_thai_phat === 'DangPhat'
    songCurrentTime.value = roomQueueStore.currentRoom?.thoi_gian_hien_tai_bai_hat ?? 0
    if (audio.value.readyState > 0) {
      audio.value.currentTime = audio.value.currentTime = songCurrentTime.value
    }
    else {
      audio.value.addEventListener('loadedmetadata', () => {
        audio.value.currentTime = audio.value.currentTime = songCurrentTime.value
      })
    }
    updateTime()
    if (!interval)
      interval = setInterval(updateTime, 1000)
    if (isPlaying.value) {
      await audio.value.play()
    }
    else {
      await audio.value.pause()
    }
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.log('error:', error)
  }
}
function nextSong() {
  if (userInRoom?.quyen === 'thanh_vien')
    return
  if (!roomQueueStore.currentSong)
    return
  roomQueueStore.nextSong(userInRoom.id)
}
function prevSong() {
  if (userInRoom?.quyen === 'thanh_vien')
    return
  if (!roomQueueStore.currentSong)
    return
  roomQueueStore.prevSong(userInRoom.id)
}
function toggleMuted() {
  if (!roomQueueStore.currentSong)
    return
  audio.value.muted = !audio.value.muted
  isMuted.value = audio.value.muted
}
function seekForward() {
  changeCurrentTime(15, 'forward')
}
function seekBackward() {
  changeCurrentTime(15, 'backward')
}
async function loadSong() {
  if (!roomQueueStore.currentSong)
    return
  isLoadingSong.value = true
  await audio.value.load()
  isLoadingSong.value = false
}
onMounted(() => {
  emitter.on(listEvents.loadSong, loadSong)
  emitter.on(listEvents.playSong, resetControl)
  emitter.on(listEvents.togglePlay, handlePlay)
  emitter.on(listEvents.nextSong, nextSong)
  emitter.on(listEvents.prevSong, prevSong)
  emitter.on(listEvents.toggleMute, toggleMuted)
  emitter.on(listEvents.seekForward, seekForward)
  emitter.on(listEvents.seekBackward, seekBackward)
})
onUnmounted(() => {
  clearInterval(interval)
  emitter.off(listEvents.loadSong, loadSong)
  emitter.off(listEvents.playSong, resetControl)
  emitter.off(listEvents.togglePlay, handlePlay)
  emitter.off(listEvents.nextSong, nextSong)
  emitter.off(listEvents.prevSong, prevSong)
  emitter.off(listEvents.seekForward, seekForward)
  emitter.off(listEvents.seekBackward, seekBackward)
  emitter.off(listEvents.toggleMute, toggleMuted)
})
</script>

<template>
  <div
    v-if="roomQueueStore.currentSong"
    class="grid w-full h-full select-none relative bg-secondary"
  >
    <div v-if=" isLoadingSong " class="flex w-full p-8 justify-center items-center">
      <Icon name="IconLoading" />
    </div>
    <div v-else class="song-controller">
      <div class="control-bar">
        <div class="flex items-center gap-4 max-lg:hidden">
          <Icon
            name="IconBackward"
            class="icon-button"
            @click="seekBackward"
          />
          <Icon name="IconPrevious" class="icon-button" @click="prevSong" />
          <button class="button-play" @click="handlePlay">
            <Icon
              v-if="isPlaying"
              name="IconPlay"
              class="cursor-pointer w-4 h-4"
            />
            <Icon v-else name="IconPause" class="cursor-pointer w-4 h-4" />
          </button>
          <Icon name="IconNext" class="icon-button" @click="nextSong" />
          <Icon
            name="IconForward"
            class="icon-button"
            @click="seekForward"
          />
        </div>
        <div class="flex gap-4 justify-center w-full">
          <span class="w-14 text-center max-lg:hidden">{{
            formatTime(songCurrentTime)
          }}</span>
          <div
            ref="progressBar"
            class="flex items-center justify-center gap-2 w-full lg:max-w-96 cursor-pointer"
            @mousedown="handleMouseDown"
          >
            <Progress v-model="progress" class="w-full" />
          </div>
          <span class="w-14 text-center max-lg:hidden">{{
            formatTime(roomQueueStore.currentSong.thoi_luong)
          }}</span>
        </div>

        <div
          class="lg:hidden flex items-center h-10 gap-2.5 absolute left-4 top-2"
        >
          <img
            v-lazy="roomQueueStore.currentSong.anh"
            alt=""
            class="w-10 h-10 rounded-lg object-cover"
          >
          <div class="song-meta w-full max-w-32">
            <p class="title text-sm truncate font-semibold">
              {{ roomQueueStore.currentSong.ten_bai_hat }}
            </p>
            <p class="artist text-xs truncate text-secondary-foreground">
              {{ roomQueueStore.currentSong.ten_ca_si }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-4 absolute right-8 top-4 lg:hidden">
          <Icon name="IconPrevious" class="icon-button" @click="prevSong" />
          <button class="button-play" @click="handlePlay">
            <Icon
              v-if="isPlaying"
              name="IconPlay"
              class="cursor-pointer w-4 h-4"
            />
            <Icon v-else name="IconPause" class="cursor-pointer w-4 h-4" />
          </button>
          <Icon name="IconNext" class="icon-button" @click="nextSong" />
        </div>
      </div>
      <audio ref="audio" controls class="hidden">
        <source :src="roomQueueStore.currentSong.lien_ket" type="audio/mpeg">
      </audio>
    </div>
  </div>
</template>

<style scoped>
.button-play {
  @apply text-center text-sm font-bold bg-[#f2f2f2] bg-secondary-foreground text-background hover:opacity-100 opacity-75 cursor-pointer flex p-2 rounded-full w-8 h-8;
  font-family: ui-sans-serif, system-ui, sans-serif;
  border-radius: 500px;
}
.song-controller {
  @apply bg-secondary flex pb-2 lg:items-center gap-14 relative w-full;

  .icon-button {
    @apply cursor-pointer w-4 h-4 hover:opacity-100 opacity-75;
  }
}
.control-bar {
  @apply flex flex-col relative lg:justify-start justify-end items-center gap-2 px-4 h-[4.25rem] lg:p-0 w-full max-lg:bg-chart3 lg:h-16 max-lg:rounded-md;
}
.thumbnail {
  @apply w-14 h-14 rounded-lg object-cover;
}
.song {
  @apply max-lg:hidden flex gap-2 items-center;
}
</style>
