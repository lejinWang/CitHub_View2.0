import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import vueJsonEditor from 'vue-json-editor'
import './assets/iconfont/iconfont.css'
import axios from 'axios'
window.router=router
window.elementplus=ElementPlus
const app=createApp(App)
app.config.globalProperties.$axios = axios
app.use(router).use(ElementPlus).use(vueJsonEditor).mount('#app')
