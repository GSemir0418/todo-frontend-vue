import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import New from './views/New.vue'
import { createPinia } from 'pinia';
import { useCurrentUser } from './stores/currentUser';
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
// 引入 pinia
const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
const { fetchMe } = useCurrentUser()
app.use(router)
app.mount('#app')

// 路由守卫
router.beforeEach(async (to, from) => {
  // 登录页面无需守卫
  if (to.path === '/login') { return true }
  // 如果没有当前用户数据，则取消路由
  console.log('to', to)
  console.log('from', from)
  const canReach = await fetchMe()
  console.log('can', canReach)
  if (canReach) {
    return true
  } else {
    return '/login'
  }
})
