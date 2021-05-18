<template>
  <div class="welcome2">
  <button class="btn" v-b-modal.modal-dop>Дополнительно</button>
  <b-modal hide-footer id="modal-dop" centered title="Дополнительно">
    <div class="form-group welcome2">
      <button @click="banCus()" class="btn my-2 ">
        <span>{{banCusBut}}</span>
      </button>
      <button @click="banVol()" v-if="orderInfo.volunteer" class="btn my-2 ">
        <span>{{banVolBut}}</span>
      </button>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
   </div>
  </b-modal>
</div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
export default {
  data() {
    return {
      successful: false,
      message: ''
    }
  },
   props: ['orderInfo'],
   computed: {
     banCusBut() {
       if(this.orderInfo.customer.blacklist === 'нет'){
         return 'Добавить нуждающегося в чёрный список'
       } else
       return 'Убрать нуждающегося из чёрного списка'
     },
      banVolBut() {
       if(this.orderInfo.volunteer.black_list === 'нет'){
         return 'Добавить волонтёра в чёрный список'
       } else
       return 'Убрать волонтёра из чёрного списка'
     }
   },
   methods: {
      ...mapActions([
          'BAN_VOL',
          'BAN_USER',
      ]),
      changeData(){
        this.$emit('changedChild', 'changed!')
      },
      banCus(){
        this.message = '';
        this.successful = false;
        this.BAN_USER(this.orderInfo.customer.id_cus).then(
            data => {
              if(data.data.blacklist === 'да'){
                this.message = 'Нуждающийся добавлен в чёрный список!';
              } else {
                this.message = 'Нуждающийся удалён из чёрного списка!'
              }
              console.log(data)
              this.successful = true;
              //setTimeout(() => this.$emit('changedChild'), 1000)
              })
      },
      banVol(){
        this.message = '';
        this.successful = false;
        this.BAN_VOL(this.orderInfo.volunteer.users).then(
            data => {
              if(data.data.black_list === 'да'){
                this.message = 'Волонтёр добавлен в чёрный список!';
              } else {
                this.message = 'Волонтёр удалён из чёрного списка!'
              }
              console.log(data)
              this.successful = true;
              })
      }
   },
}
</script>

<style>

</style>