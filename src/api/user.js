export function fetchUserData() {
    // if (!localstorage.getItem('accesstoken')) return false
    return {
        data: {
            id: 1,
            username: "darkdy nasty",
            email: "m@example.com",
            avatar: "https://avatars.githubusercontent.com/u/109841268?v=4",
            gender: "Male"
        }
    }
    // return $get('/user')
}