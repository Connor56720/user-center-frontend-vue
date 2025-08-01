import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { createPinia } from 'pinia'
import '@/access'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router).use(Antd).mount('#app')

// 在应用挂载后初始化用户信息
import { useLoginUserStore } from '@/store/useLoginUserStore'
const loginUserStore = useLoginUserStore()
loginUserStore.fetchLoginUser()
