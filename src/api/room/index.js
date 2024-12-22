import { useUserStore } from '@/stores/user'
import { v4 as uuidv4 } from 'uuid'

const roomsData = [
  {
    id: '1',
    name: 'Room 1',
    hostId: '1',
    members: [
      {
        id: '1',
        role: 'host',
        username: 'darkdynasty',
        joinedAt: new Date().toISOString(),
        avatar: 'https://avatars.githubusercontent.com/u/109841268?v=4',
      },
      {
        id: '7de8793e-d7fa-40ef-8e2e-9e725c1e92be',
        role: 'member',
        username: 'bap',
        joinedAt: new Date().toISOString(),
        avatar: 'https://avatars.githubusercontent.com/u/109841268?v=4',
      },
    ],
    messages: [
      {
        id: '1',
        senderId: '1',
        content: 'Hello',
        username: 'darkdynasty',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        senderId: '7de8793e-d7fa-40ef-8e2e-9e725c1e92be',
        content: 'Hehe',
        username: 'bap',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        senderId: '1',
        content: 'How are you?',
        username: 'darkdynasty',
        createdAt: new Date().toISOString(),

      },
      {
        id: '4',
        senderId: '7de8793e-d7fa-40ef-8e2e-9e725c1e92be',
        content: 'I am fine',
        username: 'bap',
        createdAt: new Date().toISOString(),
      },
      {
        id: '5',
        senderId: '1',
        content: 'How are you?',
        username: 'darkdynasty',
        createdAt: new Date().toISOString(),

      },
      {
        id: '6',
        senderId: '7de8793e-d7fa-40ef-8e2e-9e725c1e92be',
        content: 'I am fine',
        username: 'bap',
        createdAt: new Date().toISOString(),
      },
      {
        id: '7',
        senderId: '1',
        content: 'How are you?',
        username: 'darkdynasty',
        createdAt: new Date().toISOString(),

      },
      {
        id: '8',
        senderId: '7de8793e-d7fa-40ef-8e2e-9e725c1e92be',
        content: 'I am fine',
        username: 'bap',
        createdAt: new Date().toISOString(),
      },
      {
        id: '9',
        senderId: '1',
        content: 'How are you?',
        username: 'darkdynasty',
        createdAt: new Date().toISOString(),

      },
      {
        id: '10',
        senderId: '7de8793e-d7fa-40ef-8e2e-9e725c1e92be',
        content: 'I am fine',
        username: 'bap',
        createdAt: new Date().toISOString(),
      },
    ],
    edAt: new Date().toISOString(),
    inviteLink: 'https://www.youtube.com/watch?v=6n3pFFPSlW4',
  },
  {
    id: '2',
    name: 'Room 2',
    hostId: '2',
    members: [
      {
        id: '2',
        role: 'host',
        joinedAt: new Date().toISOString(),
      },
    ],
    messages: [
      {
        id: '2',
        senderId: '2',
        content: 'Hello',
        createdAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Room 3',
    hostId: '3',
    members: [
      {
        id: '3',
        role: 'host',
        joinedAt: new Date().toISOString(),
      },
    ],
    messages: [
      {
        id: '3',
        senderId: '3',
        content: 'Hello',
        createdAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Room 4',
    hostId: '4',
    members: [
      {
        id: '4',
        role: 'host',
        joinedAt: new Date().toISOString(),
      },
    ],
    messages: [
      {
        id: '4',
        senderId: '4',
        content: 'Hello',
        createdAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Room 5',
    hostId: '5',
    members: [
      {
        id: '5',
        role: 'host',
        joinedAt: new Date().toISOString(),
      },
    ],
    messages: [
      {
        id: '5',
        senderId: '5',
        content: 'Hello',
        createdAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
  },
]
export function createRoom({ name, hostId }) {
  return new Promise((resolve) => {
    const userStore = useUserStore()
    const roomName = name?.trim() ? name.trim() : `${userStore.user?.name}'s Room`
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
      joinedAt: new Date().toISOString(),
    })
    roomsData.push(newRoom)
    resolve({ data: newRoom })
  })
}
export function getAll() {
  return new Promise((resolve) => {
    resolve({ data: roomsData })
  })
}
export function getById(id) {
  return Promise.resolve({ data: roomsData.find(room => room.id === id) })
}
export async function addToQueue(roomId, song) {
  const room = roomsData.find(room => room.id === roomId)
  if (!room)
    return
  room.queue.push(song)
  const updatedRoom = roomsData.find(r => r.id === roomId)
  resolve({ data: updatedRoom })
}

export function addMessage(roomId, message) {
  const room = roomsData.find(room => room.id === roomId)
  if (!room) {
    reject(new Error('Room not found'))
    return
  }
  const newMessage = {
    id: message.id || uuidv4(),
    senderId: message.senderId,
    content: message.content,
    username: message.username,
    createdAt: new Date().toISOString(),
  }
  room.messages.push(newMessage)
  return newMessage
}
