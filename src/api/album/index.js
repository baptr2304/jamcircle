import { $get } from '@/api/axios'

export function fetchAlbums() {
    // return $get('/albums')
    return Promise.resolve({ data: albumsData });

}
export const albumsData = [
    {
        id: 1,
        title: "The Cookbook",
        spotifyAlbumId: "6vV5UrXcfyQD1wu4Qo2I9K",
        artistId: 1,
        imageUrl: "https://i.scdn.co/image/ab67616d0000b273f1dfae21eaac0d24fb3dcf5a",
        albumType: "album",
        releasedAt: 20050704,
        popularity: 724
    },
    {
        id: 2,
        title: "In The Zone",
        spotifyAlbumId: "0z7pVBGOD7HCIB7S8eLkLI",
        artistId: 2,
        imageUrl: "https://i.scdn.co/image/ab67616d0000b273efc6988972cb04105f002cd4",
        albumType: "album",
        releasedAt: 20031113,
        popularity: 1495
    }, {
        id: 3,
        title: "The Cookbook",
        spotifyAlbumId: "6vV5UrXcfyQD1wu4Qo2I9K",
        artistId: 1,
        imageUrl: "https://i.scdn.co/image/ab67616d0000b273f1dfae21eaac0d24fb3dcf5a",
        albumType: "album",
        releasedAt: 20050704,
        popularity: 724
    },
    {
        id: 4,
        title: "Confessions (Expanded Edition)",
        spotifyAlbumId: "0z7pVBGOD7HCIB7S8eLkLI",
        artistId: 2,
        imageUrl: "https://i.scdn.co/image/ab67616d0000b273365b3fb800c19f7ff72602da",
        albumType: "album",
        releasedAt: 20031113,
        popularity: 1495
    },
    {
        id: 5,
        title: "Confessions (Expanded Edition)",
        spotifyAlbumId: "0z7pVBGOD7HCIB7S8eLkLI",
        artistId: 2,
        imageUrl: "https://i.scdn.co/image/ab67616d0000b273365b3fb800c19f7ff72602da",
        albumType: "album",
        releasedAt: 20031113,
        popularity: 1495
    },
    {
        id: 6,
        title: "The Cookbook",
        spotifyAlbumId: "6vV5UrXcfyQD1wu4Qo2I9K",
        artistId: 1,
        imageUrl: "https://i.scdn.co/image/ab67616d0000b273f1dfae21eaac0d24fb3dcf5a",
        albumType: "album",
        releasedAt: 20050704,
        popularity: 724
    },
    {
        id: 7,
        title: "In The Zone",
        spotifyAlbumId: "0z7pVBGOD7HCIB7S8eLkLI",
        artistId: 2,
        imageUrl: "https://i.scdn.co/image/ab67616d0000b273efc6988972cb04105f002cd4",
        albumType: "album",
        releasedAt: 20031113,
        popularity: 1495
    }, {
        id: 8,
        title: "The Cookbook",
        spotifyAlbumId: "6vV5UrXcfyQD1wu4Qo2I9K",
        artistId: 1,
        imageUrl: "https://i.scdn.co/image/ab67616d0000b273f1dfae21eaac0d24fb3dcf5a",
        albumType: "album",
        releasedAt: 20050704,
        popularity: 724
    },
    {
        id: 9,
        title: "Confessions (Expanded Edition)",
        spotifyAlbumId: "0z7pVBGOD7HCIB7S8eLkLI",
        artistId: 2,
        imageUrl: "https://i.scdn.co/image/ab67616d0000b273365b3fb800c19f7ff72602da",
        albumType: "album",
        releasedAt: 20031113,
        popularity: 1495
    },
    {
        id: 10,
        title: "Confessions (Expanded Edition)",
        spotifyAlbumId: "0z7pVBGOD7HCIB7S8eLkLI",
        artistId: 2,
        imageUrl: "https://i.scdn.co/image/ab67616d0000b273365b3fb800c19f7ff72602da",
        albumType: "album",
        releasedAt: 20031113,
        popularity: 1495
    },



];