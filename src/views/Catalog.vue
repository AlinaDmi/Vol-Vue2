<template>
<div class="catalog">
        <h1>catalog</h1>
        <div class="catalog_list">
            <catalog-item
                v-for="order in ORDERS"
                :key="order.id_ord"
                v-bind:order_data="order"
                @sendID="showChildId"
            />
        </div>
</div>
  
</template>

<script>

import CatalogItem from '@/components/catalog-item.vue'
import {mapActions, mapGetters} from 'vuex'


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
        ...mapGetters([
            'ORDERS'
        ])
    },
    methods: {
        ...mapActions([
            'GET_ORDERS_API'
        ]),
        showChildId(data){
            console.log(data)
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