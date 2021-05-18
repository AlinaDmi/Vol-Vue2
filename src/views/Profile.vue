<template>
<div>
  <div class="container">
    <!-- <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul> -->
  </div>
  <profile-personal 
    :person="currentUser"
  />

  <h2 class="mt-4">Мои заказы</h2>
  
    <div class="col-md-6 mx-auto my-0">
    <div class="card-container my-0 py-0">
      <b-row>
            <b-col sm class="my-0 py-0">
              <b-form-select v-model="selectedStat" :options="optionsStat" size="sm" @change="onChangeStat()"></b-form-select>
            </b-col>
            <b-col sm class="my-0 py-0 mt-2">
                <p>Найдено заказов: {{ordersSum.length}}</p>
            </b-col>
        </b-row>
      
    </div>
    </div>

  <p v-if="!personalOrders.length">Заказов пока нет</p>

  <div class="catalog_list scrollbar-cyan">
            <orders-personal
                v-for="personalOrders in ordersSum"
                :key="personalOrders.id_ord"
                v-bind:order_data="personalOrders"
            />
  </div>
</div>
</template>

<script>

import {mapActions,mapGetters, mapState} from 'vuex'
import ordersPersonal from '../components/orders-personal.vue';
import ProfilePersonal from '../components/profile-personal.vue';
export default {
  components: { ordersPersonal, ProfilePersonal},
  name: 'Profile',
 data: function () {
    return {
      idus:0,
      role:'',
      selectedStat: null,
      ordersFiltered:[],
      optionsStatCord: [
        { value: null, text: 'Всё' },
        { value: 'активен', text: 'Активен' },
        { value: 'принят к исполнению', text: 'Принят к исполнению' },
        { value: 'выполнен', text: 'Выполнен' }],
      optionsStatVol: [
        { value: null, text: 'Всё' },
        { value: 'принят к исполнению', text: 'Принят к исполнению' },
        { value: 'выполнен', text: 'Выполнен' }],

    }
  },
  computed: {
    currentUser() {
      this.role = this.$store.state.auth.user.roleName;
      if(this.role === 'ROLE_VOL'){
        this.idus = this.$store.state.auth.user.user.id_vol;
      } else {
        this.idus = this.$store.state.auth.user.user.id_cord;
      }
      return this.$store.state.auth.user;
    },
    ...mapState([
      'personalOrders'
    ]),
    ...mapGetters([
      'withFilterPersonal'
    ]),
    optionsStat(){
      if (this.role === 'ROLE_VOL'){
        return this.optionsStatVol
      } else {
        return this.optionsStatCord
      }
    },
    ordersSum(){
      if(!this.ordersFiltered.length && this.selectedStat === null){
        return this.personalOrders
      } else {
        return this.ordersFiltered
      }
    }
  },
     watch: {
    personalOrders: {
        immediate: true, 
        deep: true,
        handler (val, oldVal) {
        }
    }
  },   

  methods: {
        ...mapActions([
            'GET_ORDERS_PERSONAL_API',
            'GET_ORDERS_PERSONAL_DONE',
            'GET_ORDERS_PERSONAL_CORD'
        ]),
        onChangeStat(){
          this.ordersFiltered=this.withFilterPersonal(this.selectedStat)
        }
    },
  mounted() {
    if(this.role === 'ROLE_VOL'){
      this.GET_ORDERS_PERSONAL_API(this.idus)
      this.GET_ORDERS_PERSONAL_DONE(this.idus)
    }
     if(this.role === 'ROLE_CORD'){
      this.GET_ORDERS_PERSONAL_CORD(this.idus)
    }
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    if (this.currentUser.roleName === "ROLE_ADMIN") {
      this.$router.push('/admin');
    }
  }
};
</script>

<style lang="scss">
    .catalog-personal {
        &_list{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            overflow-y:scroll;
        }
    }

</style>