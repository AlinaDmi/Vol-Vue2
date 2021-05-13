import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
//import { ValidationProvider } from 'vee-validate';

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import VeeValidate, { Validator } from 'vee-validate';
import ru from 'vee-validate/dist/locale/ru';

Validator.localize('ru', ru);
Vue.use(VeeValidate, {
  locale: 'ru',
});

import '@/assets/style.css'

var filter = function(text, length, clamp){
  clamp = clamp;
  var node = document.createElement('div');
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
//Vue.component('ValidationProvider', ValidationProvider);


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
