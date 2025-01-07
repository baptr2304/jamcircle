import { $delete, $get, $post } from '@/api/axios'

const playlistsData = [
  {
    id: '1',
    name: 'My Playlist 1',
    songs: [
      {
        songId: 1,
        title: 'Dancing Queen',
        imageUrl: 'https://e.snmc.io/i/1200/s/ba93504b7f780c46091fab825004e562/11411333',
        artist: {
          id: 1,
          name: 'ABBA',
          imageUrl: 'https://e.snmc.io/i/1200/s/ba93504b7f780c46091fab825004e562/11411333',
          popularity: 724,
        },
        source: 'https://ongakool.s3.ap-southeast-1.amazonaws.com/mp3/03tqyYWC9Um2ZqU0ZN849H.mp3',
        dateAdded: '2023-11-12',
      },
    ],
    createdAt: '2023-11-11T12:00:00Z',

  },
  {
    id: '2',
    name: 'My Playlist 2',
    songs: [
      {
        title: 'When I Was Your Man',
        spotifySongId: '0z7pVBGOD7HCIB7S8eLkLI',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/vi/6/62/Bruno-mars-when-i-was-your-man.jpg',
        artist: {
          id: 2,
          name: 'Bruno Mars',
          imageUrl: 'https://thatgrapejuice.net/wp-content/uploads/2013/02/bruno-mars-when-i-was-your-man.jpg',
        },
        source: 'https://ongakool.s3.ap-southeast-1.amazonaws.com/mp3/0B7wvvmu9EISAwZnOpjhNI.mp3',
        dateAdded: '2023-11-12',
      },
    ],
    createdAt: '2023-11-11T12:00:00Z',
  },
]
export async function createPlaylist(data) {
  return $post('/danh_sach_phat', data)
}
// get detail of a playlist
export async function getPlaylistById(id) {
  return await $get(`/danh_sach_phat/${id}`)
}
// get songs of a playlist
export async function getPlaylistSongs(id) {
  return await $get(`/danh_sach_phat/${id}/bai_hat`)
}
// add song to a playlist
export function addSong(playlistId, songId) {
  return $post(`/danh_sach_phat/${playlistId}/bai_hat/${songId}`)
}
// get my playlists
export async function getMy() {
  return await $get('/danh_sach_phat/tim_kiem?loai=danh_sach_phat_cua_toi')
}

export function removeSong(playlistId, index) {
  return $delete(`/danh_sach_phat/${playlistId}/bai_hat?so_thu_tu=${index}`)
}
export function deletePlaylist(playlistId) {
  return $delete(`/danh_sach_phat/${playlistId}`)
}
export function updatePlaylistName(playlistId, data) {
  // return $patch(`/playlists/${playlistId}`, { name: data.name })
  return new Promise((resolve, reject) => {
    const playlist = playlistsData.find(p => p.id === playlistId)
    if (!playlist) {
      reject(new Error('Playlist not found'))
    }
    else {
      playlist.name = data.name
      resolve({ data: playlist })
    }
  })
}

export function getAllPlaylists() {
  // return $get('/playlists')
  return Promise.resolve({ data: playlistsData })
}

export function apiGetPlaylists(config) {
  return $get('/danh_sach_phat', config)
}
