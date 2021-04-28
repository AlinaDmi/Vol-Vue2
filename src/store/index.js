import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { auth } from './auth.module';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orders:[],
    personalOrders:[],

  },
  mutations: {
    SET_ORDERS_TO_STATE: (state,orders) => {
      state.orders = orders;
    },
    SET_PERSONAL_ORDERS_TO_STATE: (state,personalOrders) => {
      state.personalOrders = personalOrders;
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
    },
    GET_ORDERS_PERSONAL_API({commit},idus){
      return axios('http://192.168.0.33:8081/api/allOrderVolunteerApp/'+idus, {
        method: "GET"
      })
      .then ((personalOrders)=>{
        commit('SET_PERSONAL_ORDERS_TO_STATE',personalOrders.data);
        return personalOrders;
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
    getOrderById: state => id => {
      return state.orders.find(order => order.id_ord === id);
    }
  }
})
