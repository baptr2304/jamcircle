<script setup>
import Icon from '@/components/base/Icon.vue'
import IconMusicSolid from '@/components/icons/IconMusicSolid.vue'
import PlaylistHeader from '@/components/playlist/PlaylistHeader.vue'
import Button from '@/components/ui/button/Button.vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { usePlaylistStore } from '@/stores/playlist'
import { onMounted } from 'vue'

const playlistStore = usePlaylistStore()

onMounted(async () => {
  await playlistStore.getMyPlaylists()
})
</script>

<template>
  <div class="relative">
    <PlaylistHeader icon="IconMusicSolid" title="Danh sách phát của tôi" />
    <RouterLink class="absolute right-2 lg:right-8 lg:top-44 top-[40%]" to="/playlist/create">
      <Button class="text-foreground rounded-full">
        <Icon name="IconAddPlaylist" class="w-6 h-6 cursor-pointer" />
        Tạo danh sách phát
      </Button>
    </RouterLink>
    <div class="overflow-y-auto scrollbar max-h-[50%]">
      <div
        v-if="playlistStore.playlists && playlistStore.playlists.length"
        class="flex flex-wrap gap-5 p-5"
      >
        <div
          v-for="playlist in playlistStore.playlists"
          :key="playlist?.id"
          class="relative p-2 pr-4 bg-secondary border flex items-center rounded-md cursor-pointer"
        >
          <RouterLink :to="`/playlist/${playlist.id}`" class="flex items-center">
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
          </RouterLink>
          <Popover class="absolute right-2">
            <PopoverTrigger>
              <Icon name="IconEllipsis" class="w-4 h-4 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent class="w-25 flex flex-col">
              <button class="mb-2" @click="playlistStore.deleteMyPlaylist(playlist.id)">
                Xóa danh sách phát
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div
        v-else-if="!loading && !error"
        class="font-medium text-xl text-center p-5 max-sm:mt-10"
      >
        Không có danh sách phát nào
      </div>
    </div>
  </div>
</template>
