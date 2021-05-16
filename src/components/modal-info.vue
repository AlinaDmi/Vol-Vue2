<template>
  <div class="welcome2">
  <b-modal id="modal-center" centered title="BootstrapVue">
        <div
        v-if="message"
        class="alert"
        :class="isSuc ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
  </b-modal>
</div>
</template>

<script>
export default {
    name:'modal-info',
    props: ['isSuc'],
    computed: {
      message() {
        if(this.isSuc === true){
          return 'Успешно!' 
        } else {
          return 'Не удалось выполнить действие. Возможно, оно уже недоступно.'
        }
        
      }
    },
}
</script>

<style>

</style>