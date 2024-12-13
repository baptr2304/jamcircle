<script setup>
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useUserStore } from "@/stores/user";
import IconEllipsis from "../../icons/IconEllipsis.vue";
import { usePlaylistStore } from "@/stores/playlist";
const playlistStore = usePlaylistStore();
const removeSong = async (index) => {
    await playlistStore.removeSongFromPlaylist(props.playlistId, index);
};
const props = defineProps({
    songs: {
        type: Array,
        default: () => [],
    },
    playlistId: {
        type: String,
        required: true,
    },
    currentPlaylistOwner: {
        type: String,
        required: true,
    },
});
const userStore = useUserStore();
const user = userStore.user;
const addSongToQueue = async (song) => {
    console.log("addSongToQueue", song);
};
</script>

<template>
    <div v-if="songs && songs.length > 0" class="overflow-y-auto max-h-64 scrollbar">
    
    
    
        <table class="w-full text-left">
    
    
    
            <thead>
    
    
    
                <tr>
    
    
    
                    <th>Title</th>
    
    
    
                    <th>Album</th>
    
    
    
                    <th>Duration</th>
    
    
    
                    <th></th>
    
    
    
                </tr>
    
    
    
            </thead>
    
    
    
            <tbody>
    
    
    
                <tr v-for="(song, index) in songs" :key="index">
    
    
    
                    <td class="flex items-center gap-4 my-2">
    
    
    
                        <img :src="song.anh" :alt="song.ten_bai_hat" class="w-10 h-10 rounded-xs object-cover" />
    
    
    
                        <div>
    
    
    
                            <h3 class="font-medium text-foreground">
    
    
    
                                {{ song.ten_bai_hat }}
    
    
    
                            </h3>
    
    
    
                            <p class="text-foreground opacity-50">{{ song.ten_ca_si }}</p>
    
    
    
                        </div>
    
    
    
                    </td>
    
    
    
                    <td>{{ song.loai || "Pop Ballad" }}</td>
    
    
    
                    <td>{{ String(song.thoi_gian_tao).split("T")[0] }}</td>
    
    
    
                    <td>
    
    
    
                        <div v-if="user?.id === currentPlaylistOwner">
    
    
    
                            <Popover>
    
    
    
                                <PopoverTrigger>
    
    
    
                                    <IconEllipsis class="w-10 h-6 text-foreground cursor-pointer" />
    
    
    
                                </PopoverTrigger>
    
    
    
                                <PopoverContent class="w-25">
    
    
    
                                    <button @click="removeSong(index)">Remove</button>
    
    
    
                                </PopoverContent>
    
    
    
                            </Popover>
    
    
    
                        </div>
    
    
    
                        <div v-else>
    
    
    
                            <Popover>
    
    
    
                                <PopoverTrigger>
    
    
    
                                    <IconEllipsis class="w-10 h-6 text-foreground cursor-pointer" />
    
    
    
                                </PopoverTrigger>
    
    
    
                                <PopoverContent class="w-25">
    
    
    
                                    <button @click="addSongToQueue(song.id)">Add to queue</button>
    
    
    
                                </PopoverContent>
    
    
    
                            </Popover>
    
    
    
                        </div>
    
    
    
                    </td>
    
    
    
                </tr>
    
    
    
            </tbody>
    
    
    
        </table>
    
    
    
    </div>
    
    
    
    <div v-else>
    
    
    
        <p>No songs available in this playlist.</p>
    
    
    
    </div>
</template>
