import { $get } from '../axios';
import { songsData } from '../mock/songs';
export async function apiGetSongs(title = '') {
    try {
        const response = await $get(`/bai_hat/tim_kiem?ten_bai_hat=${title}`)
        return response;
    }
    catch {
        throw new Error('Invalid search response');
    }

}

export function addSongById(id) {
    // return $get(`/songs/${id}`)

    return Promise.resolve({ data: songsData.find(song => song.id === id) });

}


export function getSongs() {
    const response = $get(`/bai_hat`)
    return response;

}
export function getOneSong(id) {
    // return $get(`/songs/${id}`)
    return Promise.resolve({ data: songsData.find(song => song.id === id) });

}

