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
import Offers from '../views/Offers.vue'
import Admin from '../views/Admin.vue'
import Password from '../views/Password.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/', name: 'Home', component: Home, meta: {title:'Главная'}},
  {path: '/catalog', component: Catalog, meta: {title:'Заказы'}},
  {path: '/login', component: Login, meta: {title:'Вход'}},
  {path: '/profile', component: Profile, meta: {title:'Профиль'}},
  {path: '/register', component: Reg, meta: {title:'Регистрация'}},
  {path: '/settings', component: Settings, meta: {title:'Настройки'}},
  {path: '/sendorder', component: SendOrd, meta: {title:'Заявка на помощь'}},
  {path: '/offers', component: Offers, meta: {title:'Предложения'}},
  {path: '/admin', component: Admin, meta: {title:'Администратор'}},
  {path: '/resetpass/:token', component: Password,props: true, meta: {title:'Сменить пароль'}, alias:'/resetpass'},
  {path: '/orddesc/:ordId', name:'orderdesc', component: OrdDesc, props: true, meta: {title:'Страница заказа'}},
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/','/sendorder'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  document.title = to.meta.title || '#МЫВМЕСТЕ';
  if (authRequired && !loggedIn && to.meta.title !=='Сменить пароль') {
    next('/login');
  } else {
    next();
  }
})

export default router
