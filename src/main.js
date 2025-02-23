import ImgError from '@/assets/images/ImgError.svg'
import ImgLoading from '@/assets/images/ImgLoading.svg'
import BaseIcon from '@/components/base/Icon.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import './assets/index.css'
import './utils/zodLocale'

const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .use(VueLazyload, {
    preLoad: 1.3,
    error: ImgError,
    loading: ImgLoading,
    attempt: 1,
  })
  .use(VueApexCharts)

app.component('Icon', BaseIcon)
app.component('apexchart', VueApexCharts)
router.isReady().then(() => {
  app.mount('#app')
})
