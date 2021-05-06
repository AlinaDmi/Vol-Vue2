<template>
<!-- Сделать предложение волонтёров к заказу -->
  <div class="welcome2">
  <button class="btn" v-b-modal.modal-center>Предложить волонтёру</button>
  <b-modal id="modal-center" centered title="Предложить заказ волонтёру">
    <p class="my-4">Vertically centered modal!</p>
  </b-modal>
</div>
</template>

<script>
export default {
    name:'modal'
}
</script>

<style>

</style>