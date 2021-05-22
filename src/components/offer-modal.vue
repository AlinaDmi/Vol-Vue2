<template>
  <div class="welcome2">
  <button class="btn" v-b-modal.modal-center>Предложить волонтёру</button>
  <b-modal hide-footer id="modal-center" centered title="Предложить заказ волонтёру">
   <h4>{{foundVolTitle}} {{volsFiltered.length}}</h4>
    <div class="catalog_list scrollbar-cyan">
      <find-vol :ord="orderInfo.order.id_ord"
          v-for="vol in volsFiltered"
          :key="vol.id_vol"
          v-bind:vol_data="vol"
          @sendID="
          $router.push(
              {name:'orderdesc',
              params: {ordId: order.id_ord}
              });"
      />
  </div>
  </b-modal>
</div>
</template>

<script>
import FindVol from '../components/find-vol.vue'
import { mapState,mapActions, mapGetters} from 'vuex';

export default {
    name:'modal',
    data() {
      return {
        volsFiltered:[],
        foundVolTitle: 'Найдено подходящих волонтёров: ',
        changed: false
      }
    },
    components: {FindVol},
    props: ['orderInfo'],
    computed: {
        ...mapState([
            'vols'
        ]),
           ...mapGetters([
            'getVolFilter'
        ]),

    },
    watch: {
    orderInfo: {
        immediate: true, 
        deep: true,
        handler (val, oldVal) {
          console.log('тут')
          this.filterAll(this.orderInfo.order.car, this.orderInfo.order.city)
        }
    },
    },
    methods: {
      ...mapActions([
          'GET_VOLS'
      ]),
      filterAll(car,city){
        console.log(car,city)
        this.volsFiltered=this.getVolFilter(car,city);
      },
    }, 
    mounted () {
      this.GET_VOLS();
      
    },
    
}
</script>

<style>
.catalog_list {
  align-content: flex-start
}

</style>