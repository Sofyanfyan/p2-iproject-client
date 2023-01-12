import { createApp, markRaw  } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'

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

app.use(vue3GoogleLogin, {
   clientId: '228353650776-osa4mpq26lr0b8lk06cc412mn388st4c.apps.googleusercontent.com'
})

app.use(pinia)
app.use(router)

app.mount('#app')
