import { songsData } from '../mock/songs';
export function apiGetSongs(title = '') {
    // return $get('/songs')
    return new Promise((resolve) => {
        const data = songsData.filter(
            (song) =>
                song.title.toLowerCase().includes(title.toLowerCase()) ||
                song.artist.name.toLowerCase().includes(title.toLowerCase())
        )
        resolve({ data })
    })

}
export function addSongById(id) {
    // return $get(`/songs/${id}`)

    return Promise.resolve({ data: songsData.find(song => song.id === id) });

}

export function getAllSongs() {
    // return $get('/songs')
    return Promise.resolve({ data: songsData });

}

