<template>
  <div class="card-container">

      <form name="form" @submit.prevent="handleOrder">
        <div v-if="!successful">
          <h3 v-if="!isEdited" class="d-flex justify-content-center">Форма подачи заявки</h3>
            <!-- Название -->
          <div class="form-group my-1 text-left">
            <label for="Название">Название</label>
            <input
              v-model="order.ord_name"
              v-validate="'required|min:3|max:35'"
              type="text"
              class="form-control"
              name="Название"
            />
            <small class="form-text text-muted">Продукты, Доставка, Лекарства или схожее</small>
            <div
              v-if="submitted && errors.has('Название')"
              class="alert-danger"
            >{{errors.first('Название')}}</div>
          </div>

            <!-- Описание -->
           <div class="form-group my-1 text-left">
            <label for="Описание" class="my-1 text-left">Подробное описание</label>
            <textarea
              v-model="order.ord_descript"
              v-validate="'required|min:3|max:700'"
              type="text"
              maxlength="700"
              class="form-control"
              name="Описание"
            />
            <div
              v-if="submitted && errors.has('Описание')"
              class="alert-danger"
            >{{errors.first('Описание')}}</div>
          </div>

        <!-- Город -->
            
            <div class="form-group my-1 text-left">
                <label for="city">Город</label>
                <select
                    v-model="selectedCity"
                    v-validate="'required'"
                    name="city"
                    @change="districtsByCity(selectedCity)"
                    class="form-control" id="city">
                <option :value="null">Выберите город</option>  
                <option v-for="city in cities"
                    :key="city.idcity"
                    v-bind:value="city.name">{{city.name}}</option>
                </select>
            </div>
            <!-- Район -->
            <div class="form-group my-1 text-left">
                <label for="district">Район</label>
                <select 
                    v-model="selectedDistr"
                    v-validate="'required'"
                    name="district"
                    class="form-control" id="district">
                <option :value="null">Выберите район</option>  
                <option v-for="district in districts"
                    :key="district.iddistrict"
                    v-bind:value="district.name">{{district.name}}</option>
                </select>
            </div>
            <div
              v-if="messageCit"
              class="alert"
              :class="successful ? 'alert-success' : 'alert-danger'"
            >{{messageCit}}</div>

            <!-- Улица, дом -->
            <div class="form-group my-1 text-left">
            <label for="Адрес" >Адрес</label>
            <input
              v-model="order.adress"
              v-validate="'required|min:3|max:35'"
              type="text"
              class="form-control"
              name="Адрес"
              placeholder="Улица, дом, квартира"
            />
            <div
              v-if="submitted && errors.has('Адрес')"
              class="alert-danger"
            >{{errors.first('Адрес')}}</div>
          </div>

        <!-- Чекбоксы -->
        
          <div class="form-group">
            <div class="form-check d-flex justify-content-start">
            <input
              v-model="order.urgency"
               class="form-check-input"
              type="checkbox"
              name="urgency"
            />
            <label class="text-left" for="urgency">Срочно</label>
            </div>
          </div>
        <!-- Машина -->

          <div class="form-group">
            <div class="form-check d-flex justify-content-start">
            <input
              v-model="order.car_req"
               class="form-check-input"
              type="checkbox"
              name="car"
            />
            <label class="text-left" for="car">Необходим автомобиль</label>
            </div>
          </div>
        
        <div v-if="!isEdited">
          <!-- Фио -->

          <div class="form-group my-1 text-left">
            <label for="cus_name">Ваше имя</label>
            <input
              v-model="customer.cus_name"
              v-validate="'required|min:2|max:45'"
              type="text"
              class="form-control"
              name="cus_name"
            />
          <div
            v-if="submitted && errors.has('cus_name')"
            class="alert-danger"
          >Поле обязательно для заполнения</div>
        </div>

          <!-- Телефон -->

          <div class="form-group my-1 text-left">
            <label for="cusPhone">Телефон для связи</label>
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
          >Поле обязательно для заполнения</div>
          </div>
        </div>
          <div class="form-group welcome2 d-flex justify-content-center">
            <button class="btn my-4 " :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Отправить заказ</span>
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
import {mapActions, mapGetters,mapState} from 'vuex'
import Order from '../models/order';
import Customer from '../models/customer';



export default {

  name: 'SendOrderComp',
  data() {
    return {
      order: new Order('','','','','','','',''),
      customer: new Customer('',''),
      phone: '',
      selectedCity: null,
      selectedDistr: null,
      districts: [],
       loading: false,
      submitted: false,
      successful: false,
      message: '',
      messageCit: ''
    };
  },
  props:
        ['isEdited','orderInfo','id_ord'],
   watch: {
    orderInfo: {
        immediate: true, 
        deep: true,
        handler (val, oldVal) {
            if(val !== undefined){
              this.order.ord_name = this.orderInfo.order.name
                this.order.ord_descript = this.orderInfo.order.ord_descript
                this.selectedCity = this.orderInfo.order.city
                this.districtsByCity(this.selectedCity)
                this.selectedDistr = this.orderInfo.order.district
                this.order.adress = this.orderInfo.order.adress
                if(this.orderInfo.order.urgency === 'срочно'){
                    this.order.urgency = true
                }
                if(this.orderInfo.order.car === 'да'){
                    this.order.car_req = true
                }
            }
        }
    }
  },     
  computed: {
      ...mapState([
            'cities'
        ]),
           ...mapGetters([
            'getDistrictByCity'
        ])
  },
  mounted() {
      this.GET_CITIES(),
      this.GET_DISTRICTS()
  },
  methods: {
      ...mapActions([
            'GET_CITIES',
            'GET_DISTRICTS'
        ]),
        districtsByCity(selectedCity){
          this.districts = this.getDistrictByCity(selectedCity)
        },
        acceptNumber() {
          var x = this.phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
          this.phone = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        },
    handleOrder() {
       this.loading = true;
      this.message = '';
      this.messageCit = '';
      this.submitted = true;
      this.customer.cusPhone = this.phone;
      this.order.city = this.selectedCity;
      this.order.district = this.selectedDistr;
      this.order.ord_status = 'в рассмотрении';

      if(this.order.car_req === true){
        this.order.car_req = 'да'
      } else {
        this.order.car_req = 'нет'
      }
      
      if(this.order.urgency === true){
        this.order.urgency = 'срочно'
      } else {
        this.order.urgency = 'нет'
      }

      this.$validator.validate().then(isValid => {

         if (this.selectedCity === null || this.selectedDistr === null) {
          this.loading = false;
          this.successful = false
          this.messageCit = 'Выберите город и район!';
          return;
        }
        if (isValid) {
          if (this.isEdited !== true){
              this.$store.dispatch('auth/createOrder', {order: this.order, customer: this.customer}).then(
            data => {
               this.loading = false;
              if(data.length === 8){
                this.message = 'Заказ успешно создан! Ваш код подтверждения заказа: '+data+'. Сохраниете его и назовите волонтёру при успешном выполнении вашей заявки.'
              }
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
             this.$store.dispatch('auth/editOrder', {order: this.order, id_ord: this.id_ord}).then(
            data => {
               this.loading = false;
              this.message = 'Заказ успешно обновлён';
              this.successful = true;
              setTimeout(() => this.$emit('changeOrder'), 2000)
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