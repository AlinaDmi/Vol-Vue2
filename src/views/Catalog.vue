<template>
<div class="catalog">
      <orange-block org-bl-tit="Доступные заказы"/>
      <orders-filter @clickedCar="onClickChild"/>
      <button @click="filterAll(car,urg)" type="button" class="btn btn-outline-info mx-auto d-block">
            Сорт
        </button>
        <p>Car: {{car}}</p>
        <h4>Найдено заказов: {{filteredOrders.length}}</h4>
        <!-- <p> </p> -->
        <div class="catalog_list">
            <catalog-item
                v-for="order in filteredOrders"
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

import CatalogItem from '@/components/catalog-item.vue'
import {mapActions, mapGetters,mapState} from 'vuex'
import OrangeBlock from '../components/orange-block.vue'
import OrdersFilter from '../components/orders-filter.vue'


export default {
    name:'catalog',
    components: {
        CatalogItem,
        OrangeBlock,
        OrdersFilter
    },
    data(){
        return{
            car:'',
            urg:'срочно',
            ordersFiltered:[]
        }
    },
    computed: {
        ...mapState([
            'orders'
        ]),
           ...mapGetters([
            'withFilter'
        ]),
        filteredOrders(){
            if(this.ordersFiltered.length){
                return this.ordersFiltered
            } else{
                return this.orders
            }
        }
    },
    methods: {
        ...mapActions([
            'GET_ORDERS_API'
        ]),

        showChildId(data){
            console.log(data);
        },
        filterAll(car,urg){
            this.ordersFiltered=this.withFilter(car,urg);
        },
         onClickChild (value) {
            console.log(value) // someValue
            this.car = value
        }
    },
    mounted(){
        this.GET_ORDERS_API()
        //this.ordersFiltered = orders
    }
}
</script>

<style lang="scss">
    .catalog {
        &_list{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>