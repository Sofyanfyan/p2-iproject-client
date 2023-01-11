import { createApp, markRaw  } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import './assets/main.css'
import './assets/css/templatemo-cyborg-gaming.css'
import './assets/css/fontawesome.css'
import './assets/css/flex-slider.css'     
import './assets/css/animate.css'

const pinia = createPinia()

pinia.use(({ store }) => {
   store.router = markRaw(router)
})

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
