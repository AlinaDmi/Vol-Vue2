import AuthService from '../services/auth.service';



const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
      // sessionStorage.clear();
    },

    createOrder({ commit }, {order,customer}) {
      console.log('С модуля ',order,customer)
      return AuthService.createOrder(order,customer).then(
        response => {
          console.log(response.data)
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },

    editOrder({ commit }, {order,id_ord}) {
      console.log('С модуля эдита ',order,id_ord)
      return AuthService.editOrder(order,id_ord).then(
        response => {
          console.log(response.data)
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    
    editVol({ commit }, {car,city,email,phone,id_vol}) {
      return AuthService.editVol(car,city,email,phone,id_vol).then(
        response => {
          console.log('эдит вол модуль ',response.data)
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },

    editCord({ commit }, {name,email,phone,id_cord}) {
      return AuthService.editCord(name,email,phone,id_cord).then(
        response => {
          console.log(response.data)
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    register({ commit }, {user,vol}) {
      console.log('С модуля лога ',user,vol)
      return AuthService.register(user,vol).then(
        response => {
          commit('registerSuccess');
          console.log('Респонс ',response.data,' Дата респонса ', response)
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    registerCord({ commit }, {user,cord}) {
      console.log('С модуля лога ',user,cord)
      return AuthService.registerCord(user,cord).then(
        response => {
          commit('registerSuccess');
          console.log('Респонс ',response.data,' Дата респонса ', response)
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};
