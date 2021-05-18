<template>
  <div>
    <orange-block org-bl-tit="Предложения к работе" org-bl-desc="Заказы, выбранные для вас координатором"/>
    <h4>Предложено заказов: {{orders.length}}</h4>
    <div class="catalog_list scrollbar-cyan">
        <catalog-item 
            v-for="order in orders"
            :key="order.id_ord"
            v-bind:order_data="order"
            @sendID="showChildId;
            $router.push(
                {name:'orderdesc',
                params: {ordId: order.id_ord}
                });"
        />
    </div>
  </div>
</template>

<script>
import orangeBlock from '../components/orange-block.vue'
import {mapActions,mapState} from 'vuex'
import CatalogItem from '../components/catalog-item.vue';
export default {
  components: { orangeBlock, CatalogItem },
  computed: {
    ...mapState([
        'orders'
    ]),
      currentUser() {
      return this.$store.state.auth.user.user.id_vol;
      }
  },
  methods: {
    ...mapActions([
        'GET_OFFERS'
    ]),
  },
  mounted () {
      this.GET_OFFERS(this.currentUser);
      if (this.currentUser.roleName !== 'ROLE_VOL') {
      this.$router.push('/login');
    }
  },
}
</script>

<style>

</style>