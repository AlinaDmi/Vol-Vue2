<template>
  <div class="card-container">

      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <h3 class="d-flex justify-content-center">Форма регистрации</h3>

            <p class="my-1 text-left">Тип пользователя</p>
            <select v-model="isVol" class="form-control" size="sm" name="userType">
            <option :value="true">Волонтёр</option>   
            <option :value="false">Координатор</option>   
            </select>
          
            <!-- Логин -->
          <div class="form-group my-1 text-left">
            <label for="username">Логин</label>
            <input
              v-model="user.username"
              v-validate="'required|min:3|max:35'"
              type="text"
              class="form-control"
              name="username"
            />
            <div
              v-if="submitted && errors.has('username')"
              class="alert-danger"
            >{{errors.first('username')}}</div>
          </div>

           <!-- Мыло -->
          <div class="form-group my-1 text-left">
            <label for="email">Email</label>
            <input
              v-model="user.email"
              v-validate="'required|min:3|max:40'"
              type="email"
              class="form-control"
              name="email"
            />
            <div
              v-if="submitted && errors.has('email')"
              class="alert-danger"
            >{{errors.first('email')}}</div>
          </div>

            <!-- Телефон -->
         <div class="form-group my-1 text-left">
            <label for="cusPhone">Телефон</label>
            <input
              v-model="phone" 
              v-validate="'required'"
              type="text"
              class="form-control"
              name="cusPhone"
              placeholder="(xxx)xxx-xxxx"
              @input="acceptNumber"
            />
            <div
              v-if="submitted && errors.has('cusPhone')"
              class="alert-danger"
            >{{errors.first('cusPhone')}}</div>
          </div>
          
            <!-- Пароль -->
            <div class="input-group">
            <label for="password" class="mr-1">Пароль</label>

                <div class="input-fields d-flex">
                    <input v-validate="'required'" v-model="user.password" name="password" type="password" class="form-control mr-1" placeholder="Password" ref="password">

                    <input v-validate="'required|confirmed:password'" name="password_confirmation" class="form-control" type="password" placeholder="Повтор пароля" data-vv-as="password">
                </div>
            </div>

                <!-- ERRORS -->

            <div v-if="errors.has('password')">
                {{ errors.first('password') }}
            </div>
            <div v-if="errors.has('password_confirmation')">
                {{ errors.first('password_confirmation') }}
            </div>

 
         <!-- ДР -->
          <div v-if="isVol" class="form-group my-1 text-left">
            <label for="date_birth">Дата рождения</label>
            <input
              v-model="vol.date_birth"
              v-validate="'required'"
              max="2014-01-01"
              min="1910-01-01"
              type="date"
              class="form-control"
              name="date_birth"
            />
            <div
              v-if="submitted && errors.has('date_birth')"
              class="alert-danger"
            >{{errors.first('date_birth')}}</div>
          </div>    

                   <!-- Пол -->
          <div v-if="isVol"  class="form-group my-0">
            <div class="form-check d-flex justify-content-start">
            <input
              v-model="gender"
              class="form-check-input"
              type="radio"
              value="мужской"
              name="gender_m"
            />
            <label class="text-left" for="gender_m">Мужчина</label>
            </div>
            <div class="form-check d-flex justify-content-start">
            <input
              v-model="gender"
              class="form-check-input"
              type="radio"
              value="женский"
              name="gender_f"
            />
            <label class="text-left" for="gender_f">Женщина</label>
            </div>
          </div>

        <!-- Город -->
            
            <div v-if="isVol" class="form-group my-1 text-left">
                <label for="city">Город</label>
                <select
                    v-model="selectedCity"
                    v-validate="'required'"
                    name="city"
                    class="form-control" id="city">
                 <option :value="null">Выберите город</option>   
                <option v-for="city in cities"
                    :key="city.idcity"
                    v-bind:value="city.name">{{city.name}}</option>
                </select>
            </div>

        <!-- Машина -->

          <div v-if="isVol" class="form-group">
            <div class="form-check d-flex justify-content-start">
            <input
              v-model="vol.car"
               class="form-check-input"
              type="checkbox"
              name="car"
            />
            <label class="text-left" for="car">Есть автомобиль</label>
            </div>
          </div>

         <!-- Номер волонтёра-->
          <div class="form-group my-1 text-left">
            <label for="unumber">Номер аккредитации</label>
            <input
              v-model="vol.unumber"
              v-validate="'required|min:3|max:35'"
              type="text"
              class="form-control"
              name="unumber"
            />
            <small class="form-text text-muted">Номер, выданный волонётрской организацией после прохождения обучения</small>
            <div
              v-if="submitted && errors.has('unumber')"
              class="alert-danger"
            >{{errors.first('unumber')}}</div>
          </div>  
      

          <div class="form-group welcome2 d-flex justify-content-center">
            <button class="btn my-4 " :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Зарегистрироваться</span>
            </button>
          </div>
        </div>
      </form>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
  </div>    
</template>

<script>
import {mapActions,mapState} from 'vuex'
import User from '../models/user';
import Vol from '../models/vol';
import Cord from '../models/cord';

export default {
  name: 'VolRegForm',
  data() {
    return {
      vol: new Vol('','','','','','','','','','','',''),
      cord: new Cord('','','','','','',''),
      user: new User('', '',''),
      loading: false,
      phone: '',
      gender: 'мужской',
      selectedCity: null,
      isVol: true,
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
      ...mapState([
            'cities'
        ])
  },
  mounted() {
      this.GET_CITIES()
  },
  methods: {
      ...mapActions([
            'GET_CITIES'
        ]),

        acceptNumber() {
          var x = this.phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
          this.phone = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        },
    handleRegister() {
      this.message = '';
      this.loading = true;
      this.submitted = true;

      if (this.isVol === true){
      this.vol.phone = this.phone;
      this.vol.name = this.user.username;
      this.vol.gender = this.gender;
      this.vol.city = this.selectedCity;
      this.vol.status = 'не активен';
      this.vol.user = null;
      this.vol.allocationList = null;
      this.vol.black_list = 'нет'

      if(this.vol.car === true){
        this.vol.car = 'есть'
      } else {
        this.vol.car = 'нет'
      }
      } else {
        this.cord.name = this.user.username;
        this.cord.phone = this.phone;
        this.cord.email = this.user.email;
        this.cord.status = 'не активен';
        this.cord.cnumber = this.vol.unumber;
        this.cord.user = null;
        this.cord.allocationList = null;
      }
      
      this.$validator.validate().then(isValid => {
           if (!isValid){
           this.loading = false;
          return;
        }
        if (isValid) {
          if (this.isVol === true){
            this.$store.dispatch('auth/register', {user: this.user, vol: this.vol}).then(
            data => {
              this.loading = false;
              this.message = data;
              console.log(data)
              if (this.message === 'Подтверждение аккаунта отправлено на почту!'){
                this.successful = true;
              }
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
                if (this.message === 'No message available'){
                  this.message = 'Такого кода аккредитации не существует!'
                }
              this.successful = false;
            }
          );
          } else {
            this.$store.dispatch('auth/registerCord', {user: this.user, cord: this.cord}).then(
            data => {
              this.loading = false;
              this.message = data;
              console.log(data)
              if (this.message === 'Подтверждение аккаунта отправлено на почту!'){
                this.successful = true;
              }
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
                if (this.message === 'No message available'){
                  this.message = 'Такого номера аккредитации не существует!'
                }
              this.successful = false;
            }
            );
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
label {
  display: block;
  margin-top: 10px;
}

.card-container {
  max-width: 500px !important;
    margin: 0 auto 25px;
//   margin-top: 50px;
}

// .card {
//   background-color: #f7f7f7;
//   padding: 20px 25px 30px;

//   -moz-border-radius: 2px;
//   -webkit-border-radius: 2px;
//   border-radius: 2px;
//   -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
//   -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
//   box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
// }

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>