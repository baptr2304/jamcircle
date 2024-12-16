<script setup>
import IconMusicSolid from '@/components/icons/IconMusicSolid.vue'
import PlaylistHeader from '@/components/playlist/PlaylistHeader.vue'
import Button from '@/components/ui/button/Button.vue'
import { usePlaylistStore } from '@/stores/playlist'

const playlistStore = usePlaylistStore()
onMounted(async () => {
  await playlistStore.getMyPlaylists()
})
</script>

<template>
  <div class="relative">
    <PlaylistHeader icon="IconMusicSolid" title="My Playlist" />
    <RouterLink class="absolute right-8 top-44" to="/playlist/create">
      <Button class="text-foreground rounded-full">
        <Icon name="IconAddPlaylist" class="w-6 h-6" />
        Create playlist
      </Button>
    </RouterLink>
    <div class="overflow-y-auto scrollbar max-h-[50%]">
      <div
        v-if="playlistStore.playlists && playlistStore.playlists.length"
        class="flex flex-wrap gap-5 p-5"
      >
        <RouterLink
          v-for="playlist in playlistStore.playlists"
          :key="playlist?.id"
          :to="`/playlist/${playlist.id}`"
        >
          <div
            class="w-[22.5rem] bg-secondary border h-[5rem] flex items-center rounded-md cursor-pointer"
          >
            <div
              class="w-[5rem] h-[5rem] sm:w-[4rem] sm:h-[4rem] xl:w-[5rem] xl:h-[5rem] flex items-center justify-center bg-gradient-to-r from-accent to-gray-700 rounded-tl-md rounded-bl-md overflow-hidden"
            >
              <img
                v-if="playlist.anh"
                :src="playlist.anh" alt=""
              >
              <IconMusicSolid v-else class="w-10 h-10" />
            </div>
            <div class="ml-4">
              {{ playlist.ten_danh_sach_phat }}
            </div>
          </div>
        </RouterLink>
      </div>
      <div v-else-if="!loading && !error">
        Không có playlist nào
      </div>
    </div>
  </div>
</template>
