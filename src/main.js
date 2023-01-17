import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI'
import "./styles/app.css"

const app = createApp(App)

components.forEach(component => {
  app.component(component.__name, component)
})

app.mount('#app')
