<script setup>
import PlaylistSearch from '@/components/playlist//createPlaylist/PlaylistSearch.vue'
import PlaylistHeaderDetail from '@/components/playlist/createPlaylist/PlaylistHeaderDetail.vue'
import SongTable from '@/components/playlist/createPlaylist/SongTable.vue'
import { usePlaylistStore } from '@/stores/playlist'
import { useSongStore } from '@/stores/song'
import { useUserStore } from '@/stores/user'
import { listEvents } from '@/utils/enum'
import emitter from '@/utils/eventBus'
import { computed, onMounted } from 'vue'

const route = useRoute()
const playlistStore = usePlaylistStore()
const playlistId = computed(() => route.params.id)
const songsPlaylist = ref([])
const currentPlaylist = ref(null)
const userStore = useUserStore()
const songStore = useSongStore()
const user = userStore.user
onMounted(async () => {
  try {
    currentPlaylist.value = await playlistStore.fetchDetailPlaylist(
      playlistId.value,
    )
    songsPlaylist.value = await playlistStore.fetchSongsPlaylist(
      playlistId.value,
    )
  }
  catch {
    console.error('Error fetching playlist detail')
  }
})

async function addToPlaylist(song) {
  try {
    await playlistStore.addSongToPlaylist(playlistId.value, song)
  }
  catch (error) {
    console.error('Error adding song to playlist:', error)
  }
}
async function updatePlaylistName(newName) {
  try {
    await playlistStore.updatePlaylistName(playlistId.value, newName)
    currentPlaylist.value.ten_danh_sach_phat = newName
  }
  catch (error) {
    console.error('Error updating playlist name:', error)
  }
}
async function playPlaylist() {
  await playlistStore.setCurrentPlaylist(currentPlaylist.value)
  songStore.clearPlaylist()
  songStore.setPlaylist(songsPlaylist.value)
  emitter.emit(listEvents.playSong)
}
</script>

<template>
  <div :id="playlistId">
    <PlaylistHeaderDetail
      :playlist-name="currentPlaylist?.ten_danh_sach_phat"
      :playlist-img="currentPlaylist?.anh"
      :is-playing="playlistStore.currentPlaylist?.id === playlistId"
      @update-name="updatePlaylistName"
      @play-playlist="playPlaylist"
    />
    <div v-if="songsPlaylist">
      <SongTable
        v-if="songsPlaylist"
        :playlist-id="playlistId"
        :songs="songsPlaylist"
        :current-playlist-owner="currentPlaylist?.nguoi_dung_id"
      />
      <p v-else>
        Không có bài hát nào trong danh sách phát này.
      </p>
    </div>
    <div v-else class="ml-10">
      <p>Không tìm thấy danh sách phát. Vui lòng thử lại.</p>
    </div>
    <PlaylistSearch
      v-if="user?.id === currentPlaylist?.nguoi_dung_id"
      :songs-playlist="songsPlaylist || []"
      :playlist-songs="currentPlaylist"
      @add-song="addToPlaylist"
    />
  </div>
</template>
