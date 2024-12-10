import { middlewareAuth, middlewareLayout } from '@/middlewares/index'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from '~pages'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach(async (to, from, next) => {
  if (to.path === '/') {
    return next('/home')
  }
  if (to.matched.length === 0) {
    return next('/notfound')
  }
  next()
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = "JamCircle - " + to.meta.title
  }
  next()
})
router.beforeEach(middlewareAuth)
router.beforeEach(middlewareLayout)

export default router
