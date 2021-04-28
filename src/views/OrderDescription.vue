<template>
<div>
  <orange-block
		org-bl-tit="Заказ"
		orgBlDesc="статус"/>
    <h2>{{$route.params.ordId}}</h2>
    <p>Хуита {{getOrder}}</p>
</div>
</template>

<script>
//ТУТ НУЖНО СМОТРЕТЬ СКОЛЬКО ОНО ЖИВЁТ ЕСЛИ ЧТО ТО ХУЯЧИМ ЧЕРЕЗ АПИ
import { mapState, mapGetters } from 'vuex';
import OrangeBlock from '../components/orange-block.vue'
export default {
    components: {OrangeBlock},
    props: ['ordId'],
       data(){
        return{
          ordIdData: this.ordId
        }
    },
    computed: {
        ...mapGetters([
            'getOrderById'
        ]),
        getOrder: function(){
          return this.getOrderById(1)
        }
    },
     created(){
        getOrder;
    }

}
</script>

<style>

</style>