<template>
<div class="catalog">
    <orange-block org-bl-tit="Доступные заказы"/>
    <b-container class="bv-example-row ">
        <b-row>
            <b-col sm="4" >
                <orders-filter @clickedCar="onClickChild" @clickedUrg="onClickChildUrg" @clickedStat="onClickChildStat" @clickedDistr="onClickChildDistr" @clickedCity="onClickChildCity"/>
                
                <!-- Кнопки -->
                <button @click="filterAll(car,urg,selectedDistr,stat,selectedCity)" type="button" class="btn-out mx-1">
                        Применить фильтры
                </button>

            </b-col>
        <!-- Второй столбик -->
            <b-col sm="8">
                <b-form-input class="my-4 mx-auto search" type="text" v-model="search" placeholder="найти заказ (по названию или описанию)" />
                <h4>{{foundOrdersTitle}} {{ordersCount}}</h4>
        <!-- <p> </p> -->
                <div v-if="foundOrdersTitle === 'Найдено заказов:'" class="catalog_list scrollbar-cyan">
                    <catalog-item 
                        v-for="order in filteredOrdersSearch"
                        :key="order.id_ord"
                        v-bind:order_data="order"
                        @sendID="showChildId;
                        $router.push(
                            {name:'orderdesc',
                            params: {ordId: order.id_ord}
                            });"
                    />
                </div>

            </b-col>
        </b-row>
    </b-container>
     
        
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
            car:null,
            urg:null,
            stat:null,
            ordersFiltered:[],
            selectedDistr: null,
            selectedCity: null,
            foundOrdersTitle: 'Найдено заказов:',
            search:'',
        }
    },
    computed: {
        ...mapState([
            'orders'
        ]),
           ...mapGetters([
            'withFilter'
        ]),
        currentUser() {
        return this.$store.state.auth.user;
        },
        ordersCount(){
            if(this.foundOrdersTitle === 'Найдено заказов:'){
                return this.filteredOrdersSearch.length;
            } else {
                return null
            }
        },
        filteredOrders(){
            if(this.ordersFiltered.length){
                return this.ordersFiltered
            } else{
                return this.orders
            }
        },
        filteredOrdersSearch(){
            return this.filteredOrders.filter((order) =>{
                if(order.name.toLowerCase().match(this.search.toLowerCase())
                ||order.ord_descript.toLowerCase().match(this.search.toLowerCase()))
                return order;
            })
        }

    },
    methods: {
        ...mapActions([
            'GET_ORDERS_API'
        ]),

        showChildId(data){
            console.log(data);
        },
        filterAll(car,urg,selectedDistr,stat,selectedCity){
            if (this.currentUser.roleName === 'ROLE_VOL'){
                stat = 'активен'
                selectedCity = this.currentUser.user.city
            }

            this.foundOrdersTitle = 'Найдено заказов:'
            console.log(car,urg,selectedDistr,stat,selectedCity)
            this.ordersFiltered=this.withFilter(car,urg,selectedDistr,stat,selectedCity);
            if(!this.ordersFiltered.length){
                this.foundOrdersTitle = 'Заказы не найдены'
            }
        },

         onClickChild (value) {
            console.log(value) // someValue
            this.car = value
        },
         onClickChildUrg (value) {
            this.urg = value
        },
         onClickChildStat (value) {
            this.stat = value
        },
         onClickChildDistr (value) {
            this.selectedDistr = value
        },
         onClickChildCity (value) {
            this.selectedCity = value
        }
    },
    mounted(){
        this.GET_ORDERS_API()
        this.filterAll(this.car,this.urg,this.selectedDistr,this.stat,this.selectedCity)
        
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
            height: 600px;
            overflow-y:scroll;
        }
    }
    .search{
         max-width: 600px !important;
         
    }

</style>