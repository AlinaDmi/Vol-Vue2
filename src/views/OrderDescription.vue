<template>
<div>
  <orange-block 
		:org-bl-tit="'Заказ: ' + orderDesc.name"
		:orgBlDesc="'статус: ' + orderDesc.ordstatus"/>
    <h2>{{$route.params.ordId}}</h2>
    <p>Юзер {{idus}}</p>
    <div class="welcome2  text-center">
        <button v-if="orderDesc.ordstatus==='активен' && currentUser.roleName === 'ROLE_VOL'"  type="button" @click="acceptOrder(acceptData2)" class="btn">Принять к исполнению</button>
        <button v-else-if="orderDesc.ordstatus==='принят к исполнению'" type="button" @click="acceptOrder(acceptData2)" class="btn">Завершить</button>
       
        <offer-modal :orderInfo="orderDesc" v-else-if="orderDesc.ordstatus==='активен' && currentUser.roleName === 'ROLE_CORD'"/>
       
        <div v-else-if="orderDesc.ordstatus==='в рассмотрении'">
        <button  type="button" @click="ConfirmOrder(acceptData2)" class="btn">Подтвердить</button>
        <modal-order-edit :orderInfo="orderDesc" :id_ord="ordIdData"/>
        </div>
        <modal v-else/>
        <!-- <button v-else type="button" @click="acceptOrder(acceptData2)" class="btn">Добавить фото</button> -->
  	</div>
    

</div>
<!-- Очень почистить лишние переменные тут дохуя -->
</template>

<script>
import { mapState,mapActions } from 'vuex';
import ModalOrderEdit from '../components/modal-order-edit.vue';
import Modal from '../components/modal.vue';
import OfferModal from '../components/offer-modal.vue';
import OrangeBlock from '../components/orange-block.vue'
export default {
    name:'orderDesc',
    components: {OrangeBlock, Modal, OfferModal, ModalOrderEdit},
    props: ['ordId'],
       data(){
        return{
          acceptData2: 'Нет даты ',
          idus:0,
          ordIdData: this.ordId,
          stat: '',
          response: 'none'
        }
    },
    computed: {
      ...mapState([
           ['orderDesc']
        ]),

      currentUser() {
      return this.$store.state.auth.user;
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
      
      
      // this.$store.watch(
      // (state, getters) => state.orderDesc,
      // (newValue, oldValue) => {
      //   console.log(`Updating from ${oldValue} to ${newValue}`);
      //   this.stat = state.orderDesc.ordstatus
      // })

      this.$store.watch(
      state => state.orderDesc.ordstatus,
      () => {
        console.log("update");
      }
    );
    }

}
</script>

<style>

</style>