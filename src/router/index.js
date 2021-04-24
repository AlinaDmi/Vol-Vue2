import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/login.vue'
import Profile from '../views/Profile.vue'
import Catalog from '../views/Catalog.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home},
  {path: '/catalog', component: Catalog},
  {path: '/login', component: Login},
  {path: '/profile', component: Profile},
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
