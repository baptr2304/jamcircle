import { data } from 'autoprefixer';
import { songsData } from '../mock/songs';
export function getAllSongs() {
    // return $get('/songs')
    return Promise.resolve({ data: songsData });

}
export function addSongById(id) {
    // return $get(`/songs/${id}`)

    return Promise.resolve({ data: songsData.find(song => song.id === id) });


}

