import axios from 'axios';

const API_URL = 'http://192.168.0.33:8081/api/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'auth', {
        login: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  createOrder(order,customer) {
    console.log(order,customer)
    return axios.post(API_URL + 'orderCreate', {
      orderOBJ: order,
      customerObj: customer
    });
  }

  editOrder(order, id_ord) {
    console.log('с внутри эдита ',order, id_ord)
    return axios.post(API_URL + 'orders/' + id_ord, {
      name: order.ord_name,
      car: order.car_req,
      ord_descript: order.ord_descript,
      ordstatus: order.ord_status,
      city: order.city,
      district: order.district,
      adress: order.adress,
      urgency: order.urgency
    });
  }

  // register(user) {
  //   return axios.post(API_URL + 'signup', {
  //     username: user.username,
  //     email: user.email,
  //     password: user.password
  //   });
  // }
}

export default new AuthService();
