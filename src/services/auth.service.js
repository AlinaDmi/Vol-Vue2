import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://192.168.0.33:8081/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        username: user.username,
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
    return axios.post(API_URL + 'api/orderCreate', {
      orderOBJ: order,
      customerObj: customer
    });
  }

  editOrder(order, id_ord) {
    console.log('с внутри эдита ',order, id_ord)
    return axios.post(API_URL + 'cord/orders/' + id_ord, {
      name: order.ord_name,
      car: order.car_req,
      ord_descript: order.ord_descript,
      ordstatus: order.ord_status,
      city: order.city,
      district: order.district,
      adress: order.adress,
      urgency: order.urgency},
      
      { headers: authHeader()
    });
  }

  editVol(car,city,email,phone,id_vol) {
    console.log('с внутри эдита ',car,city,email,phone)
    return axios.post(API_URL + 'vol/volunteer/' + id_vol, {
      email,
      phone,
      car,
      city},
      { headers: authHeader()
    });
  }

  editCord(name,email,phone,id_cord) {
    return axios.post(API_URL + 'cord/updateCord/' + id_cord, {
      name,
      email,
      phone
    },
      { headers: authHeader()
    });
  }

  register(user,vol) {
    return axios.post(API_URL + 'registerVol', {
      appUser: user,
      volunteer: vol
    });
  }

  // register(user,vol) {
  //   return axios.post(API_URL + 'registerVol', {
  //     appUser: user,
  //     volunteer: vol
  //   });
  // }
}

export default new AuthService();
