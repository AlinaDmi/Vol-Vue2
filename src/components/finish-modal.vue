<template>
  <div class="welcome2">
  <button class="btn" v-b-modal.modal-center>Завершить</button>
  <b-modal hide-footer id="modal-center" centered title="Завершить заказ">
    <form  @submit.prevent="handleCode">
        <div class="form-group my-1">
            <label for="Код" class="d-flex justify-content-center">Код</label>
            <input
              v-model="code"
              v-validate="'required'"
              type="text"
              class="form-control"
              name="Код"
            />
            <small class="form-text text-muted">Код, полученный от заказчика при выполнении заказа</small>
            <div
              v-if="submitted && errors.has('Код')"
              class="alert-danger"
            >{{errors.first('Код')}}</div>
        </div>
        <div class="form-group welcome2 d-flex justify-content-center">
            <button class="btn my-4 ">Завершить</button>
        </div>
    </form>
        <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
  </b-modal>
</div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name:'modalFinish',
    data() {
        return {
            code:'',
            submitted: false,
            message:'',
            successful: false
        }
    },
   props:
        ['orderInfo','id_ord'],
    methods: {
        ...mapActions([
            'FINISH_ORDER'
        ]),
        handleCode() {
            this.message = '';
            this.submitted = true;
            this.$validator.validate().then(isValid => {
                if (isValid) {
                    this.FINISH_ORDER({id_ord:this.id_ord, code:this.code}).then(
                data => {
                    this.message = data;
                    if(this.message === 'Заказ выполнен!'){
                        this.successful = true
                        setTimeout(() => this.$emit('changeOrder'), 1000)
                    }
                    })
            }
            })
            
        }
    },

}
</script>

<style >
 header{
     background-color: #FCB322;
     color: white;
 }
</style>