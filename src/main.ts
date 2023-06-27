import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import New from './views/New.vue'
// 路由文件
const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: '/new', component: New }
];
// 传入路由配置
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const app = createApp(App)
app.use(router)
app.mount('#app')
