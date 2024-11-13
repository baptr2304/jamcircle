import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

export async function middlewareLayout(to, from, next) {
  const userStore = useUserStore()
  const authStore = useAuthStore()
  const isAuthenticated = userStore.isAuthenticated
  const layout = to.meta.layout

  const authenPage = ['Playlist','playlist-create','song-create','Favorite']
  console.log(to)
  if (isAuthenticated && layout === 'auth') {
    return next('/')
  }

  if (!isAuthenticated && !['error', 'auth'].includes(layout)) {
    authStore.logout()
  }
  if(!isAuthenticated && authenPage.includes(to.name)){
    return next('/')
  }

  return next()
}
