<template>
  <div>
    <orange-block org-bl-tit="Предложения к работе" org-bl-desc="Заказы, выбранные для вас координатором"/>
    <h4>Предложено заказов: {{orders.length}}</h4>

    <div class="catalog_list scrollbar-cyan">
        <offer-item 
            v-for="order in orders"
            :key="order.orderID"
            v-bind:order_data="order"
            @delOffer="delOffer"
            @sendID="
            $router.push(
                {name:'orderdesc',
                params: {ordId: order.orderID}
                });"
        />

    </div>
  </div>
</template>

<script>
import orangeBlock from '../components/orange-block.vue'
import {mapActions,mapState} from 'vuex'
import OfferItem from '../components/offer-item.vue';
export default {
  components: { orangeBlock, OfferItem },
  computed: {
    ...mapState([
        'orders'
    ]),
      currentUser() {
      return this.$store.state.auth.user.user.id_vol;
      }
  },
    watch: {
    orders: {
        immediate: true, 
        deep: true,
        handler (val, oldVal) {
          console.log('watch')
        }
    }
  }, 
  methods: {
    ...mapActions([
        'GET_OFFERS',
        'DEL_OFFERS'
    ]),
        makeToast(append = false) {
        this.$bvToast.toast(`Предложение №${this.toastCount} успешно удалено!`, {
          title: 'Удаление',
          autoHideDelay: 5000,
          appendToast: append
        })
      },
    delOffer(offer_id){
      this.DEL_OFFERS(offer_id).then(
            data => {
              console.log(data)
              this.makeToast()
              this.GET_OFFERS(this.currentUser);
            }
      )

    }
  },
  mounted () {
      this.GET_OFFERS(this.currentUser);

  },
}
</script>

<style>

</style>