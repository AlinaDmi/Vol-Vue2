<template>
  <div class="welcome2">
  <button class="btn" v-b-modal.modal-center>Изменить</button>
  <b-modal hide-footer id="modal-center" centered title="Изменить детали заказа">
    <order-form :isEdited="true" :orderInfo="orderInfo"/>
  </b-modal>
</div>
</template>

<script>
import orderForm from './order-form.vue'
export default {
  components: { orderForm },
   props:
        ['orderInfo'],
    name:'modalOrder'
}
</script>

<style >
 header{
     background-color: #FCB322;
     color: white;
 }
</style>