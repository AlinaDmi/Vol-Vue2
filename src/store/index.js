import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { auth } from './auth.module';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orders:[],
    personalOrders:[],
    orderDesc:[]
  },
  plugins: [createPersistedState()],
  mutations: {
    SET_ORDERS_TO_STATE: (state,orders) => {
      state.orders = orders;
    },
    SET_PERSONAL_ORDERS_TO_STATE: (state,personalOrders) => {
      state.personalOrders = personalOrders;
    },
    SET_ORDER_DESC_TO_STATE: (state,orderDesc) => {
      state.orderDesc = orderDesc;
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
    },
    GET_ORDER_INFO({commit},idord){
      return axios('http://192.168.0.33:8081/api/orders/'+idord, {
        method: "GET"
      })
      .then ((orderDesc)=>{
        commit('SET_ORDER_DESC_TO_STATE',orderDesc.data);
        return orderDesc;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
    },
    ACCEPT_ORDER({commit},accdata){
      console.log('перед отправкой ',accdata)
      return axios('http://192.168.0.33:8081/api/acceptOrder/'+accdata, {
        method: "GET"
      })
      .then ((response)=>{
        console.log(response.data)
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
    },
  },
  modules: {
    auth
  },
  getters: {
    getOrderById: state => id => {
      return state.orders.find(order => order.id_ord === id);
    },
    withFilter: state => (car,urg,distr) => {
      console.log(car,urg,distr);
      let ordsels = state.orders
      if (car !== null)
      {
        // ordsels = ordsels.find(order => order.car === car)
        ordsels = ordsels.filter(order => (order.car === car))
      }
      if (urg !== null)
      {
        // ordsels = ordsels.find(order => order.urgency === urg)
         ordsels = ordsels.filter(order => order.urgency === urg)
      }
      if (distr !== null)
      {
         ordsels = ordsels.filter(order => order.district === distr)
      }
      // console.log(ordsels)
      return ordsels
  }
}
})
