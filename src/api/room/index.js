import { useSongStore } from "@/stores/song";
import { useUserStore } from "@/stores/user";
import { v4 as uuidv4 } from 'uuid';
import { songsData } from "../mock/songs";

let roomsData = [
    {
        id: "1",
        name: 'Room 1',
        hostId: '1',
        members: [
            {
                id: '1',
                role: 'host',
                username: 'darkdynasty',
                joinedAt: new Date().toISOString(),
                avatar: 'https://avatars.githubusercontent.com/u/109841268?v=4'
            },
            {
                id: '2',
                role: 'member',
                username: 'bap',
                joinedAt: new Date().toISOString(),
                avatar: 'https://avatars.githubusercontent.com/u/109841268?v=4'
            }
        ],
        messages: [
            {
                id: '1',
                senderId: '1',
                content: 'Hello',
                username: 'darkdynasty',
                createdAt: new Date().toISOString()
            },
            {
                id: '2',
                senderId: '2',
                content: 'Hehe',
                username: 'bap',
                createdAt: new Date().toISOString()
            },
            {
                id: '3',
                senderId: '1',
                content: 'How are you?',
                username: 'darkdynasty',
                createdAt: new Date().toISOString()

            }
            ,
            {
                id: '4',
                senderId: '2',
                content: 'I am fine',
                username: 'bap',
                createdAt: new Date().toISOString()
            },
            {
                id: '5',
                senderId: '1',
                content: 'How are you?',
                username: 'darkdynasty',
                createdAt: new Date().toISOString()

            }
            ,
            {
                id: '6',
                senderId: '2',
                content: 'I am fine',
                username: 'bap',
                createdAt: new Date().toISOString()
            },
            {
                id: '7',
                senderId: '1',
                content: 'How are you?',
                username: 'darkdynasty',
                createdAt: new Date().toISOString()

            }
            ,
            {
                id: '8',
                senderId: '2',
                content: 'I am fine',
                username: 'bap',
                createdAt: new Date().toISOString()
            },
            {
                id: '9',
                senderId: '1',
                content: 'How are you?',
                username: 'darkdynasty',
                createdAt: new Date().toISOString()

            }
            ,
            {
                id: '10',
                senderId: '2',
                content: 'I am fine',
                username: 'bap',
                createdAt: new Date().toISOString()
            }
        ],
        queue: [
            //add song to queue
            songsData[0],
            songsData[1],
        ],
        createdAt: new Date().toISOString(),
        inviteLink: 'https://www.youtube.com/watch?v=6n3pFFPSlW4'
    },
    {
        id: "2",
        name: 'Room 2',
        hostId: '2',
        members: [
            {
                id: '2',
                role: 'host',
                joinedAt: new Date().toISOString()
            }
        ],
        messages: [
            {
                id: '2',
                senderId: '2',
                content: 'Hello',
                createdAt: new Date().toISOString()
            }
        ],
        queue: [
            songsData[0],
            songsData[1],
            songsData[2],
        ],
        createdAt: new Date().toISOString()
    }
];
export function createRoom({ name, hostId }) {
    return new Promise((resolve) => {
        const userStore = useUserStore()
        const roomName = name?.trim() ? name.trim() : `${userStore.user?.name}'s Room`;
        const newRoom = {
            id: uuidv4(),
            name: roomName,
            hostId: hostId || userStore.user?.id,
            members: [],
            messages: [],
            queue: [],
            createdAt: new Date().toISOString(),

        }
        newRoom.members.push({
            id: hostId,
            role: 'host',
            joinedAt: new Date().toISOString()
        });
        roomsData.push(newRoom);
        resolve({ data: newRoom });
    })
}
export function getAll() {
    return new Promise((resolve) => {
        resolve({ data: roomsData });

    })

}
export function getById(id) {
    return Promise.resolve({ data: roomsData.find(room => room.id === id) });
}
export function addToQueue(roomId, songId) {
    return new Promise(async (resolve, reject) => {
        try {
            const songStore = useSongStore();
            const song = await songStore.getSongById(songId);
            if (!song) {
                reject(new Error("Song not found"));
                return;
            }
            const room = roomsData.find((room) => room.id === roomId);
            if (!room) {
                reject(new Error("Room not found"));
                console.log('room not found')
                return;
            }
            const songWithUniqueKey = {
                ...song,
                uniqueKey: uuidv4()
            }
            room.queue.push(songWithUniqueKey);
            const updatedRoom = roomsData.find(r => r.id === roomId);
            resolve({ data: updatedRoom });
        } catch (error) {
            reject(error);
        }
    });
}
// export function removeSong(roomId, uniqueKey){
//     return new Promise ((resolve,reject)=>{
//         const room = roomsData.find(room => room.id === roomId);
//         if(!room){
//             reject(new Error("Room not found"));
//             return;
//         }
//         room.queue = room.queue.filter(song => song.uniqueKey !== uniqueKey);
//         resolve({data: room});
//     })
// }
export function addMessage(roomId, message) {
    return new Promise((resolve, reject) => {
        const room = roomsData.find(room => room.id === roomId);
        if (!room) {
            reject(new Error("Room not found"));
            return;
        }
        const newMessage = {
            id: message.id || uuidv4(),
            senderId: message.senderId,
            content: message.content,
            username: message.username,
            createdAt: new Date().toISOString()
        }
        room.messages.push(newMessage);
        resolve(newMessage);
    })
}