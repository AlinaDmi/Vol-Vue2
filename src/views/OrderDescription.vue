<template>
<div>
  <orange-block
		org-bl-tit="Заказ"
		:orgBlDesc="stat + getOrder.ordstatus"/>
    <h2>{{$route.params.ordId}}</h2>
    <p>Хуита {{getOrder}}</p>
    <p>Юзер {{idus}}</p>
    <div class="welcome2  text-center">
				<button type="button" @click="acceptOrder(acceptData2)" class="btn">Принять к исполнению</button>
		</div>
</div>
<!-- Очень почистить лишние переменные тут дохуя -->
</template>

<script>
//ТУТ НУЖНО СМОТРЕТЬ СКОЛЬКО ОНО ЖИВЁТ ЕСЛИ ЧТО ТО ХУЯЧИМ ЧЕРЕЗ АПИ
// ПОЧЕМУ БЛЯТЬ НИХУЯ НЕ ГРУЗИТ НАХУЙ БЛТЬ
// ТАМ ЕЩЕ ОН ПОЧЕМУ-ТО ТЫРИТ ИДШКУ ЮЗЕРА ТОЛЬКО ПОСЛЕ КЛИКА
import { mapState, mapGetters,mapActions } from 'vuex';
import OrangeBlock from '../components/orange-block.vue'
export default {
    name:'orderDesc',
    components: {OrangeBlock},
    props: ['ordId'],
       data(){
        return{
          acceptData2: 'Нет даты ',
          idus:0,
          ordIdData: this.ordId,
          stat: 'статус: '
        }
    },
    computed: {
      currentUser() {
      return this.$store.state.auth.user;
      },
      ...mapGetters([
          'getOrderById'
      ]),
      getOrder(){
        return this.getOrderById(this.ordIdData)
      }
    },
    methods: {
      ...mapActions([
          'ACCEPT_ORDER'
      ]),
      acceptOrder(acceptData2){
        this.ACCEPT_ORDER(acceptData2)
      }

    },
     mounted(){
        this.idus = this.$store.state.auth.user.volunteer.id_vol;
        this.getOrder;
        this.$store.getters.getOrderById(this.ordIdData);
        this.acceptData2 = this.ordIdData+','+this.$store.state.auth.user.volunteer.id_vol;
        
    }

}
</script>

<style>

</style>