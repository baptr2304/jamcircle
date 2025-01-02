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
    <PlaylistHeader icon="IconMusicSolid" title="Danh sách phát của tôi" />
    <RouterLink class="absolute right-2 lg:right-8 top-44" to="/playlist/create">
      <Button class="text-foreground rounded-full">
        <Icon name="IconAddPlaylist" class="w-6 h-6" />
        Tạo danh sách phát
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
            class="p-2 pr-4 bg-secondary border flex items-center rounded-md cursor-pointer"
          >
            <div
              class="lg:w-[5rem] lg:h-[5rem] w-[4rem] h-[4rem] sm:w-[4rem] sm:h-[4rem] xl:w-[5rem] xl:h-[5rem] flex items-center justify-center bg-gradient-to-r from-accent to-gray-700 rounded-md overflow-hidden"
            >
              <img
                v-if="playlist.anh"
                :src="playlist.anh" alt=""
              >
              <IconMusicSolid v-else class="w-10 h-10" />
            </div>
            <div class="ml-4 truncate max-w-52">
              {{ playlist.ten_danh_sach_phat }}
            </div>
          </div>
        </RouterLink>
      </div>
      <div
        v-else-if="!loading && !error"
        class="font-medium text-xl text-center p-5 max-sm:mt-10"
      >
        Không có playlist nào
      </div>
    </div>
  </div>
</template>
