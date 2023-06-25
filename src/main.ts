import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue'
import Login from './views/Login.vue'
// 路由文件
const routes = [
  { path: "/", component: HelloWorld  },
  { path: "/login", component: Login },
];
// 传入路由配置
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const app = createApp(App)
app.use(router)
app.mount('#app')
