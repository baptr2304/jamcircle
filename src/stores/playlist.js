import {
  addSongToPlaylist,
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  removeSongFromPlaylist,
  updatePlaylistName
} from '@/api/playlist';
import { defineStore } from 'pinia';

export const usePlaylistStore = defineStore('playlist', () => {

  const playlists = ref([])
  const currentPlaylist = ref(null)

  async function createNewPlaylist(name) {
    try {
      const { data } = await createPlaylist(name);
      return data;
    } catch (error) {
      console.error('Error in createNewPlaylist:', error);
      throw error;
    }
  }
  async function fetchDetailPlaylist(playlistId) {
    try {
      const { data } = await getPlaylistById(playlistId);
      // currentPlaylist.value = data;
      return data;
    } catch (error) {
      console.error('Error in fetchDetailPlaylist:', error);
      throw error;
    }
  }
  async function addSong(playlistId, song) {
    try {
      const { data } = await addSongToPlaylist(playlistId, song.id);
      return data;
    } catch (error) {
      console.error('Error in addSongToPlaylist:', error);
      throw error;
    }
  }

  async function removeSong(playlistId, songId) {
    try {
      const { data } = await removeSongFromPlaylist(playlistId, songId);
      const index = currentPlaylist.value.songs.findIndex((song) => song.id === songId);
      if (index !== -1)
        currentPlaylist.value.songs.splice(index, 1);
    } catch (error) {
      console.error('Error in removeSongFromPlaylist:', error);
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

  async function fetchAllPlaylists() {
    try {
      const { data } = await getAllPlaylists();
      playlists.data = data;
      return playlists.data;
    } catch (error) {
      console.error('Error in fetchAllPlaylists:', error);
      throw error;
    }
  }
  function loadFromLocalStorage() {
    const id = localStorage.getItem('playlists');
    if (id)
      fetchDetailPlaylist(id);
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
    addSong,
    removeSong,
    updatePlaylist,
    fetchAllPlaylists,
    loadFromLocalStorage,
    reset
  }
});
