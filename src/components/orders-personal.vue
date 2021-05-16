<template>
<!-- Стиль, кнопки, марджины, подрезка описания по сколько-то символов, переход -->
  <div class="catalog-item-personal mx-auto p-2">
      <b-container>
        <b-row>
            <b-col>
                <p> <br> {{order_data.name | truncate(20, '...')}}</p>
            </b-col>
            <b-col>
                <p>Дата размещения <br> {{order_data.date_app | truncate(10, '')}}</p>
            </b-col>
            <b-col>
                <p> Дата завершения <br> {{finish | truncate(10, '')}}</p>
            </b-col>
            <b-col>
                <p> Статус <br> {{order_data.ordstatus}}</p>
            </b-col>
            <b-col sm="2" >
                <button @click="$router.push(
                                    {name:'orderdesc',
                                    params: {ordId: order_data.id_ord}
                                    })" type="button" class=" btn-out d-block">
                    Подробнее
        
                </button>
            </b-col>

        </b-row>         
      </b-container>
                 
    </div>
    
</template>

<script>
export default {
    name: 'catalog-item',
    props: {
        order_data: {
            type: Object,
            default() {
                return{
                }
            }
        }
    },
    computed:{
        finish(){
            if(this.order_data.date_finish){
                return this.order_data.date_finish
            } else {
                return '-'
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
    .catalog-item-personal {
       flex-basis: 85%;
       border: 1px solid #7EBDC2 !important;
       text-align: left;
    }
    #item-header{
        text-align: center;
    }
</style>