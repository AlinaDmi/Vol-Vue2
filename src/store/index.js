import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orders:[]
  },
  mutations: {
    SET_PRODUCTS_TO_STATE: (state,orders) => {
      state.products = products;
    }
  },
  actions: {
    GET_ORDERS_API({commit}){
      return axios('http://192.168.0.33:8081/api/orders', {
        method: "GET"
      })
      .then ((orders)=>{
        commit('SET_PRODUCTS_TO_STATE',products.data);
        return products;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
    }
  },
  modules: {
  },
  getters: {
    PRODUCTS(state){
      return state.products;
    }
  }
})
