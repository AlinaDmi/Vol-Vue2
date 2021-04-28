<template>
<div class="catalog">
        <h1>catalog</h1>
        <!-- <p> </p> -->
        <div class="catalog_list">
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

import CatalogItem from '@/components/catalog-item.vue'
import {mapActions, mapGetters,mapState} from 'vuex'


export default {
    name:'catalog',
    components: {
        CatalogItem
    },
    data(){
        return{
        }
    },
    computed: {
        ...mapState([
            'orders'
        ])
    },
    methods: {
        ...mapActions([
            'GET_ORDERS_API'
        ]),
        showChildId(data){
            console.log(data);
        }
    },
    mounted(){
        this.GET_ORDERS_API()
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