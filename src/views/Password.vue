<template>
<div class="">
    <orange-block :org-bl-tit="'Сменить пароль'"/>
   <div class="card card-container mb-5 mt-2">
        <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
      <form name="form" @submit.prevent="handlePass">
      
                  <!-- Пароль -->
            <div class="input-group">
            <label for="password" class="mr-1">Новый пароль</label>

                <div class="input-fields d-flex">
                    <input v-validate="'required'" v-model="password" name="password" type="password" class="form-control mr-1" placeholder="Password" ref="password">

                    <input v-validate="'required|confirmed:password'" name="password_confirmation" class="form-control" type="password" placeholder="Повтор пароля" data-vv-as="password">
                </div>
            </div>

                <!-- ERRORS -->

            <div v-if="errors.has('password')">
                {{ errors.first('password') }}
            </div>
            <div v-if="errors.has('password_confirmation')">
                {{ errors.first('password_confirmation') }}
            </div>

            
          <div class="form-group welcome2 d-flex justify-content-center">
            <button class="btn my-4 " :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Сменить пароль</span>
            </button>
          </div>
      </form>
    </div>
</div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
import orangeBlock from '../components/orange-block.vue'
export default {
  components: { orangeBlock },
  data() {
      return {
          password: '',
          message:'',
          successful:false,
          loading: false
      }
  },
    methods: {
        ...mapActions([
          'RESET_PASS_TOKEN'
      ]),
        handlePass() {
        this.$validator.validate().then(isValid => {
           if (!isValid){
           this.loading = false;
            return;
            } else {
                this.RESET_PASS_TOKEN({token:this.$route.params.token,newpass:this.password}).then(
            data => {
              this.loading = false;
              if(data.data === 'Неверный токен: INVALID RESET TOKEN'){
                  this.successful = false
                  this.message = 'Ссылка смены пароля недействительна'
              } else {
                  this.successful = true
              this.message = data.data;
              }
              
              console.log(data)
            }
          );
            }
        })
        }
    },
}
</script>

<style>

</style>