<template>
<!-- Стиль, кнопки, марджины, подрезка описания по сколько-то символов, переход -->
  <div class="catalog-item mx-auto my-2 p-4">
    <div class="content-heading text-center">
        <img v-if="order_data.urgency==='срочно'" style="float:left" class="img-fluid icon" src="../assets/pics/alert.svg"/>
        <h4>{{order_data.name}}</h4>
    </div>

    <b-container class="my-3">
    <b-row>
      <b-col md class="my-0 py-0">
        <p class="catalog-item_adr my-1"><b>{{order_data.city}}</b>, {{order_data.district}}</p>
      </b-col>
      <b-col sm class="my-0 py-0">
        <p class="catalog-item_stat my-1"><b>Статус:</b> {{order_data.ordstatus}}</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="my-0 py-0">
        <p class="my-1"><b>Срочность:</b> {{order_data.urgency}}</p>
      </b-col>
      <b-col class="my-0 py-0">
        <p class="my-1"><b>Автомобиль:</b> {{order_data.car}}</p>
      </b-col>
    </b-row>
    <b-row>
        <b-col>
            <p class="catalog-item_descr my-1"><b>Описание:</b> {{order_data.ord_descript | truncate(50, '...')}}</p>
        </b-col>
    </b-row>
    </b-container>    
        
        <button @click="sendDataToParent" type="button" class="btn-out mx-auto d-block">
            Подробнее
        </button>
    </div>
</template>

<script>
export default {
    name: 'catalog-item',
    props: {
        order_data: {
            type: Object,
            default() {
                return{}
            }
        }
    },
    methods:{
        sendDataToParent(){
            this.$emit('sendID',this.order_data.id_ord);
        }
    }
}
</script>


<style lang="scss">
    .catalog-item {
       flex-basis: 85%;
       box-shadow: 0 0 8px 0 #e0e0e0;
       padding: 4;
       text-align: left;
      //  margin: auto;
    }
    #item-header{
        text-align: center;
    }
</style>