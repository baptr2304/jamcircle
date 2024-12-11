// playlist.js
import { $delete, $get, $patch } from "@/api/axios";
import { v4 as uuidv4 } from "uuid";
import { songsData } from "../mock/songs";
let playlistsData = [
    {
        id: "1",
        name: "My Playlist 1",
        songs: [
            {
                songId: 1,
                title: "Dancing Queen",
                imageUrl: "https://e.snmc.io/i/1200/s/ba93504b7f780c46091fab825004e562/11411333",
                artist: {
                    id: 1,
                    name: "ABBA",
                    imageUrl: "https://e.snmc.io/i/1200/s/ba93504b7f780c46091fab825004e562/11411333",
                    popularity: 724
                },
                source: 'https://ongakool.s3.ap-southeast-1.amazonaws.com/mp3/03tqyYWC9Um2ZqU0ZN849H.mp3',
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
                title: "When I Was Your Man",
                spotifySongId: "0z7pVBGOD7HCIB7S8eLkLI",
                imageUrl: "https://upload.wikimedia.org/wikipedia/vi/6/62/Bruno-mars-when-i-was-your-man.jpg",
                artist: {
                    id: 2,
                    name: "Bruno Mars",
                    imageUrl: "https://thatgrapejuice.net/wp-content/uploads/2013/02/bruno-mars-when-i-was-your-man.jpg",
                },
                source: 'https://ongakool.s3.ap-southeast-1.amazonaws.com/mp3/0B7wvvmu9EISAwZnOpjhNI.mp3',
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
        console.log('playlistsData', playlistsData);
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
            uniqueKey: uuidv4(),
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
        console.log('playlist', playlist);
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


export function apiGetPlaylists(config) {
    return $get('/danh_sach_phat', config)
}