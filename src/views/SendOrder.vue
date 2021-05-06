
<template>
<div>
  <orange-block 
		:org-bl-tit="'Как получить помощь?'"
		:orgBlDesc="'Для получения волонтёрской помощи оставьте заявку в форме на сайте или позвоните на горячую линию. Телефон горячей линии: 8-800-200-341'"/>
  <div class="col-md-12">
    <order-form />
  </div>
</div>  
</template>

<script>
import orangeBlock from '../components/orange-block.vue';
import OrderForm from '../components/order-form.vue';


export default {
  components: { orangeBlock, OrderForm },
  name: 'SendOrder',
};
</script>

<style lang="scss">

</style>