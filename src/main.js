import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import vueJsonEditor from 'vue-json-editor'
import './assets/iconfont/iconfont.css'
window.router=router
window.elementplus=ElementPlus
createApp(App).use(router).use(ElementPlus).use(vueJsonEditor).mount('#app')
