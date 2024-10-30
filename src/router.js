import generatedRoutes from '~pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  if(to.meta.title)
    document.title = 'JamCircle - ' + to.meta.title
  next()
})
export default router
