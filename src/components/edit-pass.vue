<template>
<div class="col-md-12">
 <div class="card-container">
  
            <div class="card-body d-flex justify-content-center">
                <!-- Custom switch -->
                <p class="custom-control custom-switch custom-switch-lg">
                    <input class="custom-control-input custom-control-input-warning" @change="onChange()" id="customSwitch11" v-model="status" type="checkbox">
                    <label class="custom-control-label" for="customSwitch11">Профиль активен</label>
                    <small v-if="currentUser.roleName === 'ROLE_VOL'" class="form-text text-muted">При неактивном статусе нельзя принимать заказы, а также координаторы не смогут присылать вам предложения</small>
                </p>
            </div>
     <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
  </div>
</div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      status: '',
      message:'',
      successful: false
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
      ...mapActions([
        'CHANGE_STAT_CORD',
        'CHANGE_STAT_VOL'
    ]),
    onChange() {
      if(this.currentUser.roleName === 'ROLE_VOL'){
        this.message = this.CHANGE_STAT_VOL(this.currentUser.user.id_vol)
      } else {
        this.message = this.CHANGE_STAT_CORD(this.currentUser.user.id_cord)
      }
      if(this.message){
        this.successful = true
        this.message = 'Данные успешно изменены. Для корректного отображения изменений перезайдите в аккаунт'
      }
    }
  },
  mounted () {
    this.status = this.currentUser.user.status;
    if (this.status === 'не активен') {
      this.status = false
    } else {
      this.status = true
    }
  },
}
</script>
<style scoped lang="scss">
label {
  display: block;
  margin-top: 10px;
}

.card-container {
  max-width: 500px !important;
  padding: 15px 40px;
    margin: 0 auto 25px;

}

body {
    min-height: 100vh;
    background: #121618;
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>