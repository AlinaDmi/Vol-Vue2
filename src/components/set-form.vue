<template>
<div>
  <div class="col-md-12">
 <div class="card-container">
   <!-- Активен -->
        <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
      <form name="form" @submit.prevent="handleSet">

            <!-- Логин -->
           
           <!-- ФИО -->
          <div class="form-group my-1 text-left">
            <label for="name">Имя</label>
            <input
              v-model="vol.name"
              v-validate="'required|min:2|max:40'"
              type="text"
              class="form-control"
              name="name"
            />
            <div
              v-if="submitted && errors.has('name')"
              class="alert-danger"
            >{{errors.first('name')}}</div>
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

         <!-- ДР -->
  

                   <!-- Пол -->

        <!-- Город -->
            
            <div v-if="currentUser.roleName === 'ROLE_VOL'" class="form-group my-1 text-left">
                <label for="city">Город</label>
                <select
                    v-model="vol.city"
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

          <div v-if="currentUser.roleName === 'ROLE_VOL'" class="form-group">
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
 
        <!-- В ЭТИ ФОРМЫ ЕБНУТЬ ПОИСК ВМЕСТЕ СО СПИСКОМ ТАМ БЫЛ ПРИМЕР ГДЕ_ТО НАЙДИ -->
          <div class="form-group welcome2 d-flex justify-content-center">
            <button class="btn my-4 " :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Сохранить</span>
            </button>
          </div>
      </form>

      
  </div>    
  </div>
</div>  
</template>

<script>
import {mapActions, mapState} from 'vuex'
import User from '../models/user';
import Vol from '../models/vol';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', '',''),
      vol: new Vol('','','','','','','','','','','',''),
      loading: false,
      phone: '',
      gender: '',
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    ...mapState([
        'cities'
    ]),
    currentUser() {
    return this.$store.state.auth.user;
    }
  },
  mounted() {
    this.GET_CITIES()
    this.phone = this.currentUser.user.phone
    this.vol.city = this.currentUser.user.city
    this.user.email = this.currentUser.user.email
    this.vol.car = this.currentUser.user.car
    this.vol.name = this.currentUser.user.name
  },
 methods: {
    ...mapActions([
          'GET_CITIES',
          'EDIT_NAME'
      ]),

    acceptNumber() {
      var x = this.phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.phone = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    },

    handleSet() {
      this.message = '';
      this.loading = true;
      this.submitted = true;
      this.vol.phone = this.phone;

      if(this.vol.car === true){
        this.vol.car = 'есть'
      } else {
        this.vol.car = 'нет'
      }

      this.$validator.validate().then(isValid => {
        if (isValid) {
            
             if(this.currentUser.roleName === 'ROLE_VOL'){
                this.$store.dispatch('auth/editVol', {car: this.vol.car, city: this.vol.city, email: this.user.email, phone: this.vol.phone, id_vol: this.currentUser.user.id_vol}).then(
                data => {
                   this.loading = false;
                  this.EDIT_NAME( {id_vol:this.currentUser.user.id_vol, name:this.vol.name})
                  this.message = 'Данные успешно изменены. Для корректного отображения изменений перезайдите в аккаунт';
                  console.log(data)
                  this.successful = true;
                },
                error => {
                   this.loading = false;
                  this.message =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                  this.successful = false;
                }
              );
              
             } else {
                this.$store.dispatch('auth/editCord', {name:this.vol.name, email: this.user.email, phone: this.vol.phone, id_cord: this.currentUser.user.id_cord}).then(
                data => {
                  this.message = 'Данные успешно изменены. Для корректного отображения изменений перезайдите в аккаунт';
                  console.log(data)
                  this.successful = true;
                },
                error => {
                  this.message =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
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

<style  lang="scss">
label {
  display: block;
  margin-top: 10px;
}

.card-container {
  max-width: 500px !important;
  padding: 15px 40px;
    margin: 0 auto 25px;
}


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