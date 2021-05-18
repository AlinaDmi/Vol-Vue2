import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { auth } from './auth.module';
import authHeader from '../services/auth-header';
import createPersistedState from "vuex-persistedstate";
import {API_URL} from "../Config"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orders:[],
    personalOrders:[],
    orderDesc:[],
    cities:[],
    districts:[],
    vols:[]
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
    },
    SET_CITIES_TO_STATE: (state,cities) => {
      state.cities = cities;
    },
    SET_DISTRICTS_TO_STATE: (state,districts) => {
      state.districts = districts;
    },
    SET_VOLS_TO_STATE: (state,vols) => {
      state.vols = vols;
    }
  },
  actions: {
    GET_ORDERS_API({commit}){
      return axios(API_URL+'order/orders', {
        headers: authHeader() ,
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
      return axios(API_URL+'order/allOrderVolunteerApp/'+idus, {
        headers: authHeader() ,
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
    GET_ORDERS_PERSONAL_DONE({commit},idus){
      return axios(API_URL+'order/allOrderVolunteerFinish/'+idus, {
        headers: authHeader() ,
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
    GET_ORDERS_PERSONAL_CORD({commit},idus){
      return axios(API_URL+'cord/ordersCord/'+idus, {
        headers: authHeader() ,
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
      console.log('id ',idord)
      return axios(API_URL+'order/order/'+idord, {
        headers: authHeader() ,
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
    GET_CITIES({commit}){
      return axios(API_URL+'city/city', {
        method: "GET"
      })
      .then ((cities)=>{
        commit('SET_CITIES_TO_STATE',cities.data);
        return cities;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
    },
    GET_DISTRICTS({commit}){
      return axios(API_URL+'district/district', {
        method: "GET"
      })
      .then ((districts)=>{
        commit('SET_DISTRICTS_TO_STATE',districts.data);
        return districts;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
    },
    GET_VOLS({commit}){
      return axios(API_URL+'cord/volunteersList/status/1', {
        headers: authHeader() ,
        method: "GET"
      })
      .then ((vols)=>{
        commit('SET_VOLS_TO_STATE',vols.data);
        return vols;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
    },
    GET_OFFERS({commit},vol){
      return axios(API_URL+'vol/vol/offers/'+vol, {
        headers: authHeader() ,
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
    ACCEPT_ORDER({commit},accdata){
      console.log('перед отправкой ',accdata)
      return axios(API_URL+'vol/acceptOrder/'+accdata, {
        headers: authHeader() ,
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
    FINISH_ORDER({commit},{id_ord,code}){
      console.log('перед отправкой ',id_ord,code)
      return axios(API_URL+'vol/confirmOrder/'+id_ord+','+code, {
        headers: authHeader() ,
        method: "GET"
      })
      .then ((response)=>{
        console.log(response.data)
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
    },
    OFFER({commit},{vol,cord,ord}){
      console.log('перед отправкой offer',vol,cord,ord)
      return axios(API_URL+'cord/offers', {
        data: {
          id_vac: cord,
          vol: vol,
          id_order: ord
        },
        headers: authHeader() ,
        method: "POST"
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
    VOL_REPORT({commit},{report,time,idOrder}){
      console.log('перед отправкой offer',report,time,idOrder)
      return axios(API_URL+'feed/feedback', {
        data: {
          report,
          time,
          idOrder
        },
        headers: authHeader() ,
        method: "POST"
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
    GET_VOL_REPORT({commit},id_ord){
      console.log('перед отправкой offer',id_ord)
      return axios(API_URL+'feed/feedback/order/'+id_ord, {
        headers: authHeader() ,
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
    EDIT_NAME({commit},{id_vol,name}){
      console.log('перед отправкой edit',id_vol,name)
      return axios(API_URL+'vol/volunteer/name/'+id_vol, {
        data: {
          name: name
        },
        headers: authHeader() ,
        method: "POST"
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
    RESET_PASS_EMAIL({commit},email){
      console.log('перед отправкой ',email)
      return axios(API_URL+'resetpassword/'+email, {
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
    CHANGE_STAT_VOL({commit},id_vol){
      console.log('перед отправкой ',id_vol)
      return axios(API_URL+'vol/statusVol/'+id_vol, {
        headers: authHeader() ,
        method: "POST"
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
    CHANGE_STAT_CORD({commit},id_cord){
      console.log('перед отправкой ',id_cord)
      return axios(API_URL+'cord/statusCord/'+id_cord, {
        headers: authHeader() ,
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
    CONFIRM_ORDER_CORD({commit},accdata){
      console.log('перед отправкой ',accdata)
      return axios(API_URL+'cord/ordersConfirmation/'+accdata, {
        headers: authHeader() ,
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
    BAN_USER({commit},id){
      return axios(API_URL+'cord/updateCustomerBlackList/'+id, {
        headers: authHeader() ,
        method: "POST"
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
    
    BAN_VOL({commit},id){
      return axios(API_URL+'cord/blackListVolunteer/'+id, {
        headers: authHeader() ,
        method: "POST"
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
    ADD_CODE_VOL({commit},code){
      return axios(API_URL+'admin/codeVol/'+code, {
        headers: authHeader() ,
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
    ADD_CODE_CORD({commit},code){
      return axios(API_URL+'admin/codeCord/'+code, {
        headers: authHeader() ,
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
    getVolFilter: state => (car,city) => {
      console.log(car,city);
      let volsSort = state.vols
      if (car !== null)
      {
        if(car === 'да'){
          car = 'есть'
        }
        volsSort = volsSort.filter(vol => (vol.car === car))
      }
      if (city !== null)
      {
        volsSort = volsSort.filter(vol => vol.city === city)
      }
      volsSort = volsSort.filter(vol => vol.black_list === 'нет')
      volsSort = volsSort.filter(vol => vol.status === 'активен')
      return volsSort
    },
    getDistrictByCity: state => city => {
      console.log(city);
      console.log(state.districts.filter(district => district.parentName === city));
      return state.districts.filter(district => district.parentName === city);
    },
    withFilter: state => (car,urg,distr,stat,city) => {
      console.log(car,urg,distr,stat,city);
      let ordsels = state.orders
      if (car !== null)
      {
        ordsels = ordsels.filter(order => (order.car === car))
      }
      if (urg !== null)
      {
         ordsels = ordsels.filter(order => order.urgency === urg)
      }
      if (city !== null)
      {
        ordsels = ordsels.filter(order => (order.city === city))
      }
      if (distr !== null)
      {
         ordsels = ordsels.filter(order => order.district === distr)
      }
      if (stat !== null)
      {
         ordsels = ordsels.filter(order => order.ordstatus === stat)
      }
      // console.log(ordsels)
      return ordsels
  },
  withFilterPersonal: state => (stat) => {
    console.log(stat);
    let ordsels = state.personalOrders
    if (stat !== null)
    {
       ordsels = ordsels.filter(order => order.ordstatus === stat)
    }
    return ordsels
}
}
})
