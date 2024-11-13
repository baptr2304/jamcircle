// playlist.js
// import { $delete, $get, $patch } from "@/api/axios";

export const playlistsData = [
    {
        id: "1",
        name: "My Favorite Songs",
        songs: [
            {
                songId: 1,
                title: "Lose Control",
                artist: "Missy Elliott",
                albumName: "The Cookbook",
                duration: "Unknown Duration",
                imageUrl: "https://i.scdn.co/image/ab67616d0000b273f1dfae21eaac0d24fb3dcf5a",
                dateAdded: "2023-11-12",
            },
        ],
        createdAt: "2023-11-11T12:00:00Z",
    },
];

export function getPlaylistById(playlistId) {
    // return $get(`/playlists/${playlistId}`)
    return Promise.resolve({
        data: playlistsData.find((p) => p.id === playlistId),
    });
}
export function createPlaylist(name = 'My playlist '+ new Date().getTime()) {
    // return $post('/playlists', { name })
    return new Promise((resolve) => {
        const newPlaylist = {
            id: Date.now().toString(),
            name,
            songs: [],
            createdAt: new Date().toISOString()
        };
        console.log("Creating new playlist:", newPlaylist);
        resolve({ data: newPlaylist });
    });
}
export function addSongToPlaylist(playlistId, song) {
    // return $post(`/playlists/${playlistId}/songs`, { songId })
    return new Promise((resolve, reject) => {
        if (!playlistId) {
            reject(new Error(`Playlist not found with id: ${playlistId}`));
            return;
        }

        const formattedSong = {
            id: new Date().getTime(),
            title: "Toxic",
            spotifySongId: "0z7pVBGOD7HCIB7S8eLkLI",
            imageUrl: "https://i.scdn.co/image/ab67616d0000b273efc6988972cb04105f002cd4",
            albumType: "album",
            albumName: "Confessions (Expanded Edition)",
            releasedAt: 20031113,
            popularity: 1495,
            artist: {
                id: 2,
                name: "Britney Spears",
                imageUrl: "https://i.scdn.co/image/ab67616d0000b273efc6988972cb04105f002cd4",
            }
        };

        resolve({ data: formattedSong });
    });
}

export function removeSongFromPlaylist(playlistId, songId) {
    // return $delete(`/playlists/${playlistId}/songs/${songId}`)
    return new Promise((resolve, reject) => {
        const playlist = playlistsData.find((p) => p.id === playlistId);
        if (!playlist) {
            reject(new Error("Playlist not found"));
        } else {
            playlist.songs = playlist.songs.filter((song) => song.songId !== songId);
            resolve({ data: playlist });
        }
    });
}

export function updatePlaylistName(playlistId, data) {
    // return $patch(`/playlists/${playlistId}`, { name: data.name })
    return new Promise((resolve, reject) => {
        const playlist = playlistsData.find((p) => p.id === playlistId);
        if (!playlist) {
            reject(new Error("Playlist not found"));
        } else {
            playlist.name = data.name;
            resolve({ data: playlist });
        }
    });
}

export function getAllPlaylists() {
    // return $get('/playlists')
    return Promise.resolve({ data: playlistsData });
}
