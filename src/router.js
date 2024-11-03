import generatedRoutes from '~pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach(async (to, from, next) => {
  if (to.fullPath === '/') {
    return next('/home')
  }
  if (to.matched.length === 0) {
    return next('/notfound')
  }
  return next()
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = "JamCircle - " + to.meta.title
  }
  next()
})

export default router
