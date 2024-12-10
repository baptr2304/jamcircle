import { $get } from '../axios';
import { songsData } from '../mock/songs';
export function apiGetSongs(title = '') {
    return $get(`/bai_hat/tim_kiem?ten_bai_hat=${title}`).then(response => {
        const mappedSongs = response.map(song => ({
            id: song.id,
            title: song.ten_bai_hat,
            artist: {
                name: song.ten_ca_si || 'Unknown',
            },
            imageUrl: song.anh || 'https://via.placeholder.com/150',
            albumName: song.ten_album || 'Unknown',
        }));
        console.log(mappedSongs);
        return mappedSongs;

    });
}
export function addSongById(id) {
    // return $get(`/songs/${id}`)

    return Promise.resolve({ data: songsData.find(song => song.id === id) });

}

export function getAllSongs() {
    // return $get('/songs')
    return Promise.resolve({ data: songsData });

}
export function getSongs(offset = 0, limit = 20) {
    return $get(`/bai_hat?offset=${offset}&limit=${limit}`).then(response => ({
        data: response.data,
        total: response.total
    }))

}
export function getOneSong(id) {
    // return $get(`/songs/${id}`)
    return Promise.resolve({ data: songsData.find(song => song.id === id) });

}

