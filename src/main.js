import BaseIcon from '@/components/base/Icon.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/index.css'
import './utils/zodLocale'

const app = createApp(App)

app
  .use(createPinia())
  .use(router)

app.component('Icon', BaseIcon)

router.isReady().then(() => {
  app.mount('#app')
})
