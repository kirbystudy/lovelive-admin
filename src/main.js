import { createApp } from 'vue'
// 假设你的根组件是 App.vue
// 并放置在与 main.js 相同的文件夹中
import App from './App.vue'
import { Quasar } from 'quasar'
import router from './router'
import store from './store'
import './permission.js'

// 导入图标库
import '@quasar/extras/material-icons/material-icons.css'

// 导入css样式
import 'quasar/src/css/index.sass'

const myApp = createApp(App)

myApp.use(router)
myApp.use(store)

myApp.use(Quasar, {
  plugins: {} // 导入 Quasar 插件并在此处添加
})

myApp.mount('#app') // 假设您的 index.html 中有一个 <div id="app"></div>
