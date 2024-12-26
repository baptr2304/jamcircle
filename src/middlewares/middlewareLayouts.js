import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

export async function middlewareLayout(to, from, next) {
  const userStore = useUserStore()
  const authStore = useAuthStore()
  const isAuthenticated = userStore.isAuthenticated
  const layout = to.meta.layout
  const userRole = userStore.user?.role

  const authenPage = ['Playlist', 'playlist-create', 'song-create', 'Favorite', 'Profile', 'Room']
  if (isAuthenticated && layout === 'auth' && userRole !== 'quan_tri_vien') {
    return next('/')
  }

  if (!isAuthenticated && !['error', 'auth'].includes(layout)) {
    authStore.logout()
  }
  if (!isAuthenticated && authenPage.includes(to.name)) {
    return next('/')
  }

  return next()
}
