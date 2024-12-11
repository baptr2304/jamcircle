import {
  createPlaylist,
  getPlaylistById,
  removeSongFromPlaylist,
  updatePlaylistName,
  apiGetPlaylists,
  addSong
} from '@/api/playlist';
import { defineStore } from 'pinia';
import { useUserStore } from './user';
export const usePlaylistStore = defineStore('playlist', () => {
  const userStore = useUserStore()
  const playlists = ref(null)
  const currentPlaylist = ref(null)

  async function createNewPlaylist(ten_danh_sach_phat) {
    try {
      const nguoi_dung_id = userStore.user?.id;
      const response = await createPlaylist({
        ten_danh_sach_phat,
        nguoi_dung_id,
        loai: 'yeu_thich'
      });
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error in createNewPlaylist:', error);
      throw error;
    }
  }
  async function fetchDetailPlaylist(playlistId) {
    try {
      const data = await getPlaylistById(playlistId);
      return data;
    } catch (error) {
      console.error('Error in fetchDetailPlaylist:', error);
      throw error;
    }

  }
  async function addSongToPlaylist(playlistId, song) {
    try {
      const { data } = await addSong(playlistId, song.id);
      return data;
    } catch (error) {
      console.error('Error in addSongToPlaylist:', error);
      throw error;
    }
  }

  async function removeSong(playlistId, uniqueKey) {
    try {
      const { data } = await removeSongFromPlaylist(playlistId, uniqueKey);
      if (currentPlaylist.value && currentPlaylist.value.id === playlistId) {
        const index = currentPlaylist.value.songs.findIndex(
          (song) => song.uniqueKey === uniqueKey
        );
        if (index !== -1) {
          currentPlaylist.value.songs.splice(index, 1);
        }
      }
    } catch (error) {
      console.error("Error in removeSongFromPlaylist:", error);
      throw error;
    }
  }

  async function updatePlaylist(playlistId, newName) {
    try {
      const { data } = await updatePlaylistName(playlistId, { name: newName });
      const playlist = getPlaylistById(playlistId);
      if (playlist) {
        playlist.name = data.name;
      }
      return data;
    } catch (error) {
      console.error('Error in updatePlaylistName:', error);
      throw error;
    }
  }

  async function getPlaylists(config) {
    return await apiGetPlaylists(config)
  }

  function reset() {
    playlists.data = [];
    localStorage.removeItem('playlists');
  }
  return {
    playlists,
    currentPlaylist,
    createNewPlaylist,
    fetchDetailPlaylist,
    addSongToPlaylist,
    removeSong,
    updatePlaylist,
    getPlaylists,
    reset
  }
});
