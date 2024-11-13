import { songsData } from '../mock/songs';
export function fetchSongs() {
    // return $get('/songs')
    return Promise.resolve({ data: songsData });

}
export function fetchSongById(id) {
    // return $get(`/songs/${id}`)
    return Promise.resolve({ data: songsData.find(s => s.id === id) });
}

