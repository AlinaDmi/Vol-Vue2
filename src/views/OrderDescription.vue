<template>
<div>
  <orange-block 
		:org-bl-tit="'Заказ: ' + orderDesc.order.name"
		:orgBlDesc="'статус: ' + orderDesc.order.ordstatus"/>
    <h2>{{$route.params.ordId}}</h2>
    <p>Юзер {{idus}}</p>

  <b-container >
    <b-row>
      <b-col sm>
        <p class="d-flex justify-content-start"><b class="mr-1">Дата поступления заказа: </b> {{orderDesc.order.date_app | truncate(10, '')}}</p>
        <p class="d-flex justify-content-start"> <b class="mr-1">Дата принятия к выполнению:</b> {{dateVol | truncate(10, '')}}</p>
        <p class="d-flex justify-content-start"> <b>Дата завершения заказа:</b> {{dateFinish | truncate(10, '')}}</p>
        <p class="d-flex justify-content-start text-left"><b class="mr-1">Адрес: </b> {{orderDesc.order.city}}, {{orderDesc.order.district}}, {{orderDesc.order.adress}}</p>
        <p class="d-flex justify-content-start "><b class="mr-1">Необхоим автомобиль: </b> {{orderDesc.order.car}}</p>
        <p class="d-flex justify-content-start "><b class="mr-1">Срочно: </b> {{orderDesc.order.urgency}}</p>
     
      </b-col>
      <b-col sm >
        <div >
        <p class="d-flex justify-content-start my-0 py-0"> <b>Описание:</b></p>
        <p class="d-flex justify-content-start text-left">{{orderDesc.order.ord_descript}}</p>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm>
        <p class="my-0 py-0"> <b>Нуждающийся:</b></p>
        <p class="my-0">{{cus_name}}</p>
        <p >{{cus_phone}}</p>
      </b-col>
      <b-col sm>
        <p class="my-0 py-0"> <b>Координатор:</b></p>
        <p class=" my-0">{{cord_name}}</p>
        <p >{{cord_phone}}</p>
      </b-col>
      <b-col sm>
        <p class=" my-0 py-0"> <b>Волонтёр:</b></p>
        <p class=" my-0">{{vol_name}}</p>
        <p >{{vol_phone}}</p>
      </b-col>
    </b-row>
  </b-container>

    <div class="welcome2  text-center">
        <button v-if="orderDesc.order.ordstatus==='активен' && currentUser.roleName === 'ROLE_VOL'"  type="button" @click="acceptOrder(acceptData2)" class="btn">Принять к исполнению</button>
        <finish-modal @changeOrder="GET_ORDER_INFO(ordIdData)" :id_ord="ordIdData"  v-else-if="orderDesc.ordstatus==='принят к исполнению' && currentUser.roleName === 'ROLE_VOL'"/>
       
        <offer-modal :orderInfo="orderDesc" v-else-if="orderDesc.order.ordstatus==='активен' && currentUser.roleName === 'ROLE_CORD'"/>
       
        <div v-else-if="orderDesc.order.ordstatus==='в рассмотрении' && currentUser.roleName === 'ROLE_CORD'" class="d-flex justify-content-center">
          <button  type="button" @click="ConfirmOrder(acceptData2)" class="btn mr-2">Подтвердить</button>
          <modal-order-edit :orderInfo="orderDesc" :id_ord="ordIdData"/>
        </div>
        <modal :id_ord="ordIdData" :id_vol="currentUser.user.id_vol" v-else-if="orderDesc.order.ordstatus==='завершен' && currentUser.roleName === 'ROLE_VOL'"/>
         	</div>
    

</div>
<!-- Очень почистить лишние переменные тут дохуя -->
</template>

<script>
import { mapState,mapActions } from 'vuex';
import FinishModal from '../components/finish-modal.vue';
import ModalOrderEdit from '../components/modal-order-edit.vue';
import Modal from '../components/modal.vue';
import OfferModal from '../components/offer-modal.vue';
import OrangeBlock from '../components/orange-block.vue'
export default {
    name:'orderDesc',
    components: {OrangeBlock, Modal, OfferModal, ModalOrderEdit, FinishModal},
    props: ['ordId'],
       data(){
        return{
          acceptData2: 'Нет даты ',
          idus:0,
          ordIdData: this.ordId,
          stat: '',
          vol_name:'-',
          vol_phone:'-',
          cord_name:'-',
          cord_phone:'-',
          cus_name:'-',
          cus_phone:'-',
          response: 'none'
        }
    },
    computed: {
      ...mapState([
           ['orderDesc']
        ]),

      currentUser() {
      return this.$store.state.auth.user;
      },
      dateFinish() {
        if (this.orderDesc.order.date_finish){
          return this.orderDesc.order.date_finish
        } else
        return '-';
      },
      dateVol() {
        if (this.orderDesc.order.date_start){
          return this.orderDesc.order.date_start
        } else
        return '-';
      }
    },
    methods: {
      ...mapActions([
          'ACCEPT_ORDER',
          'GET_ORDER_INFO',
          'CONFIRM_ORDER_CORD'
      ]),
      acceptOrder(acceptData2){
        this.response = this.ACCEPT_ORDER(acceptData2);
      },
      ConfirmOrder(acceptData2){
        this.response = this.CONFIRM_ORDER_CORD(acceptData2);
      }
    },

// СДЕЛАТЬ ПРОВЕРКУ тип если статус в рассмотрении и акк не корда то послать нахуй
     mounted(){
      this.GET_ORDER_INFO(this.ordIdData);
      this.stat = this.orderDesc.ordstatus
      if(this.$store.state.auth.user.roleName === 'ROLE_VOL'){
        this.idus = this.$store.state.auth.user.user.id_vol;
      } else{
        this.idus = this.$store.state.auth.user.user.id_cord;
      }
      this.acceptData2 = this.ordIdData+','+this.idus;
      if (this.orderDesc.volunteer){
          this.vol_name = this.orderDesc.volunteer.name
          this.vol_phone = this.orderDesc.volunteer.phone
        }
      if (this.orderDesc.cord){
          this.cord_name = this.orderDesc.cord.name
          this.cord_phone = this.orderDesc.cord.phone
        }
      if (this.orderDesc.customer){
        this.cus_name = this.orderDesc.customer.cus_name
        this.cus_phone = this.orderDesc.customer.cusphone
      }
      
      // this.$store.watch(
      // (state, getters) => state.orderDesc,
      // (newValue, oldValue) => {
      //   console.log(`Updating from ${oldValue} to ${newValue}`);
      //   this.stat = state.orderDesc.ordstatus
      // })

      this.$store.watch(
      state => state.orderDesc.order.ordstatus,
      () => {
        console.log("update");
        this.stat = this.orderDesc.order.ordstatus
      }
    );
    },


}
</script>

<style>

</style>