import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Catalog from '../views/Catalog.vue'
import Reg from '../views/Register.vue'
import Settings from '../views/Settings.vue'
import SendOrd from '../views/SendOrder.vue'
import OrdDesc from '../views/OrderDescription.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home},
  {path: '/catalog', name: 'Заказы', component: Catalog},
  {path: '/login', component: Login},
  {path: '/profile', component: Profile},
  {path: '/register', component: Reg},
  {path: '/settings', component: Settings},
  {path: '/sendorder', component: SendOrd},
  {path: '/orddesc/:ordId', name:'orderdesc', component: OrdDesc, props: true},
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// ПОТОМ ВЕРНИ И ДОПИШИ РОУТЫ

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// })

export default router
