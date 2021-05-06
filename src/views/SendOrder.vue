
<template>
<div>
  <orange-block 
		:org-bl-tit="'Как получить помощь?'"
		:orgBlDesc="'Для получения волонтёрской помощи оставьте заявку в форме на сайте или позвоните на горячую линию. Телефон горячей линии: 8-800-200-341'"/>

  <div class="col-md-12">
    <div class="card-container">


      <!-- <form @submit.prevent="submitApp">
          <input type="email" name="email" />
          <button>Отправить заказ</button>
      </form>    -->

      
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
            <!-- Название -->
          <div class="form-group my-1 text-left">
            <label for="ord_name">Название</label>
            <input
              v-validate="'required|min:3|max:35'"
              type="text"
              class="form-control"
              name="ord_name"
            />
            <small id="emailHelp" class="form-text text-muted">Продукты, Доставка, Лекарства или схожее</small>
            <div
              v-if="submitted && errors.has('ord_name')"
              class="alert-danger"
            >{{errors.first('ord_name')}}</div>
          </div>
            <!-- Описание -->
           <div class="form-group my-1 text-left">
            <label for="ord_descript" class="my-1 text-left">Подробное описание</label>
            <textarea
              v-validate="'required|min:3|max:700'"
              type="text"
              class="form-control"
              name="ord_descript"
            />
            <div
              v-if="submitted && errors.has('ord_descript')"
              class="alert-danger"
            >{{errors.first('ord_descript')}}</div>
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

            <!-- Улица, дом -->
            <div class="form-group my-1 text-left">
            <label for="adress" >Адрес</label>
            <input
              v-validate="'required|min:3|max:35'"
              type="text"
              class="form-control"
              name="adress"
              placeholder="Улица, дом, квартира"
            />
            <div
              v-if="submitted && errors.has('adress')"
              class="alert-danger"
            >{{errors.first('adress')}}</div>
          </div>

        <!-- Чекбоксы -->
        
          <div class="form-group">
            <div class="form-check d-flex justify-content-start">
            <input
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
               class="form-check-input"
              type="checkbox"
              name="car"
            />
            <label class="text-left" for="car">Необходим автомобиль</label>
            </div>
          </div>

          <!-- Фио -->

          <div class="form-group my-1 text-left">
            <label for="cus_name">Ваше имя</label>
            <input
              v-validate="'required|min:2|max:45'"
              type="text"
              class="form-control"
              name="cus_name"
            />
            <div
              v-if="submitted && errors.has('cus_name')"
              class="alert-danger"
            >{{errors.first('cus_name')}}</div>
          </div>

          <!-- Телефон -->

          <!-- ОТФОРМАТИРОВАТЬ И ПОСОМТРЕТЬ ВИ ВАЛИДЕЙТ НА МЫЛО И ПРОЧЕЕ И НЕ ЗАБЫТЬ ДОБАВИТЬ СТАТУС -->
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
            >{{errors.first('cusPhone')}}</div>
          </div>

          <!-- В ЭТИ ФОРМЫ ЕБНУТЬ ПОИСК ВМЕСТЕ СО СПИСКОМ ТАМ БЫЛ ПРИМЕР ГДЕ_ТО НАЙДИ -->
          <div class="form-group welcome2">
            <button class="btn">Отправить заказ</button>
          </div>
        </div>
      </form>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
    </div>
  </div>
</div>  
</template>

<script>
import orangeBlock from '../components/orange-block.vue';
import {mapActions, mapGetters,mapState} from 'vuex'
import Order from '../models/order';
import Customer from '../models/customer';


export default {
  components: { orangeBlock },
  name: 'SendOrder',
  data() {
    return {
      order: new Order('','','','','','','',''),
      customer: new Customer('',''),
      phone: '',
      ord_status:'в рассмотрении',
      selectedCity: null,
      selectedDistr: null,
      districts: [],
      submitted: false,
      successful: false,
      message: ''
    };
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
      sendOrder(){
          alert('Заебок')
      },
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          alert('Заебок')
        //   this.$store.dispatch('auth/register', this.user).then(
        //     data => {
        //       this.message = data.message;
        //       this.successful = true;
        //     },
        //     error => {
        //       this.message =
        //         (error.response && error.response.data && error.response.data.message) ||
        //         error.message ||
        //         error.toString();
        //       this.successful = false;
        //     }
        //   );
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
  padding: 40px 40px;
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