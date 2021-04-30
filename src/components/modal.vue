<template>
  <div class="welcome2">
  <button class="btn" v-b-modal.modal-center>Добавить фото</button>
  <b-modal id="modal-center" centered title="BootstrapVue">
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