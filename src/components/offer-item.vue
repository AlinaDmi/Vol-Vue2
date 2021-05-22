<template>
  <div class="catalog-item mx-auto my-2 p-4">

    <b-container class="my-3">
    <b-row>
        <b-col>
            <p class="catalog-item_descr my-1"><b>Предложение №: </b> {{order_data.id_app}}</p>
            {{order_data.orderID}}
        </b-col>
        <b-col>
            <img style="float:right" @click="delToParent" class="img-fluid icon rot" src="../assets/pics/x-mark.svg"/>
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
            console.log('id ',this.order_data.orderID)
            this.$emit('sendID',this.order_data.orderID);
        },
         delToParent(){
            this.$emit('delOffer',this.order_data.id_app);
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