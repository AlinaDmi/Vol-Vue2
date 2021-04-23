<template>
<div class="catalog">
        <h1>catalog</h1>
        <div class="catalog_list">
            <catalog-item
                v-for="order in orders"
                :key="order.id_ord"
                v-bind:order_data="order"
                @sendID="showChildId"
            />
        </div>
</div>
  
</template>

<script>

import CatalogItem from '@/components/catalog-item.vue'

export default {
    name:'catalog',
    components: {
        CatalogItem
    },
    data(){
        return{
        orders:  [
        {
            id_ord: 12,
            name: "Продукты",
            car: "да",
            ord_descript: "ываыва",
            ordstatus: "в рассмотрении",
            city: "Санкт-Петербург",
            district: "Выборгский район",
            adress: "ыва",
            urgency: "срочно"
        },
        {
            id_ord: 26,
            name: "Лекарства",
            car: "нет",
            ord_descript: "доставка лекартсв",
            ordstatus: "в рассмотрении",
            city: "Санкт-Петербург",
            district: "Днищенский район",
            adress: "ебалайская 69",
            urgency: "срочно"
        },
        {
            id_ord: 31,
            name: "Продукты",
            car: "да",
            ord_descript: "продукты-хуюкты к моему подъезду",
            ordstatus: "в рассмотрении",
            city: "Санкт-Петербург",
            district: "Выборгский район",
            adress: "хуядрес блять",
            urgency: "срочно"
        }
    ]
        }
    },
    methods: {
        showChildId(data){
            console.log(data)
        }
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