// playlist.js
import { $delete, $get, $post } from "@/api/axios";
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
export async function createPlaylist(data) {
    const { ten_danh_sach_phat, nguoi_dung_id, loai,anh } = data;
    return $post('/danh_sach_phat', { ten_danh_sach_phat, nguoi_dung_id, loai,anh });

}
//get detail of a playlist
export async function getPlaylistById(id) {
    const response = await $get(`/danh_sach_phat/${id}`);
    return response;

}
// get songs of a playlist
export async function getPlaylistSongs(id) {
    const response = await $get(`/danh_sach_phat/${id}/bai_hat`);
    return response;
}
// add song to a playlist
export function addSong(playlistId, songId) {
    return $post(`/danh_sach_phat/${playlistId}/bai_hat/${songId}`);
}
// get my playlists
export async function getMy() {
    const response = await $get('/danh_sach_phat/tim_kiem?loai=yeu_thich');
    return response;
}


export function removeSong(playlistId, index) {
    const response = $delete(`/danh_sach_phat/${playlistId}/bai_hat?so_thu_tu=${index}`);
    return response;
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