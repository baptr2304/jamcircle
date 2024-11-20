import { $get } from '@/api/axios'
export function fetchUserData() {
    return {
        data: {
            id: 1,
            name: "darkdy nasty",
            email: "m@example.com",
            avatar: "https://avatars.githubusercontent.com/u/78248024?v=4",
            gender: "Male"
        }
    }
    return $get('/user')
}