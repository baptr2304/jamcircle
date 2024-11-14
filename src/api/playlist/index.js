// playlist.js
// import { $delete, $get, $patch } from "@/api/axios";
import { songsData } from "../mock/songs";

let playlistsData = [
    {
        id: "1",
        name: "My Playlist 1",
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
    {
        id: "2",
        name: "My Playlist 2",
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
    }
];

export function getPlaylistById(playlistId) {
    // return $get(`/playlists/${playlistId}`)
    return Promise.resolve({
        data: playlistsData.find((playlist) => playlist.id === playlistId),
    });

}
export function createPlaylist(name = 'My playlist ' + new Date().getTime()) {
    // return $post('/playlists', { name })
    return new Promise((resolve) => {
        const newPlaylist = {
            id: Date.now().toString(),
            name,
            songs: [],
            createdAt: new Date().toISOString()
        };
        playlistsData.push(newPlaylist);
        resolve({ data: newPlaylist });
    });
}
export function addSongToPlaylist(playlistId, songId) {
    // return $post(`/playlists/${playlistId}/songs`, { songId })
    return new Promise((resolve, reject) => {
        const playlist = playlistsData.find((p) => p.id === playlistId);
        if (!playlist) {
            reject(new Error("Playlist not found"));
            return;
        }

        const song = songsData.find((s) => s.id === songId);
        if (!song) {
            reject(new Error("Song not found"));
            return;
        }

        const formattedSong = {
            songId: song.id,
            title: song.title,
            artist: song.artist?.name || "Unknown Artist",
            albumName: song.albumName || "Unknown Album",
            duration: song.duration || "Unknown Duration",
            imageUrl: song.imageUrl || "",
            dateAdded: new Date().toISOString(),
        };

        playlist.songs.push(formattedSong);
        resolve({ data: playlist });
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
