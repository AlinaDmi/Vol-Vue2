import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { auth } from './auth.module';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orders:[]
  },
  mutations: {
    SET_ORDERS_TO_STATE: (state,orders) => {
      state.orders = orders;
    }
  },
  actions: {
    GET_ORDERS_API({commit}){
      return axios('http://192.168.0.33:8081/api/orders', {
        method: "GET"
      })
      .then ((orders)=>{
        commit('SET_ORDERS_TO_STATE',orders.data);
        return orders;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
    }
  },
  modules: {
    auth
  },
  getters: {
    ORDERS(state){
      return state.orders;
    }
  }
})
