<template>
<!-- Стиль, кнопки, марджины, подрезка описания по сколько-то символов, переход -->
  <div class="catalog-item mx-auto my-2 p-4">
        <h6 id="item-header">{{order_data.name}}</h6>
        <p >{{order_data.city}}</p>
        <p >{{order_data.date_app}}</p>
        <p >{{order_data.ordstatus}}</p>
        <button @click="$router.push('orddesc')" type="button" class="btn btn-outline-info mx-auto d-block">
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
            this.$emit('sendID',this.order_data.id_ord)
        }
    }
}
</script>


<style lang="scss">
    .catalog-item {
       flex-basis: 75%;
       box-shadow: 0 0 8px 0 #e0e0e0;
       padding: 4;
       text-align: left;
      //  margin: auto;
    }
    #item-header{
        text-align: center;
    }
</style>