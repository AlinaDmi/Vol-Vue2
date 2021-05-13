<template>
<div>
  <orange-block org-bl-tit="Авторизация"/>
  <div class="col-md-12">
    <div class="card card-container">
      <!-- <h3>Форма входа</h3> -->
      <!-- <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      /> -->
      <p v-if="resetM"> Проверьте свою электронную почту. Если на неё зарегестрирован аккаунт, то вам было отправлено письмо о смене пароля. </p>

       <form v-if="reset" name="form" @submit.prevent="handlePassword">
        <div class="form-group">
          <label for="email">Для смены пароля введите ваш email</label>
          <input
            v-model="email"
            v-validate="'required'"
            type="email"
            class="form-control"
            name="email"
          />
          <div
            v-if="errors.has('email')"
            class="alert alert-danger"
            role="alert"
          >Необходимо ввести email</div>
        </div>
          <div class="form-group welcome2">
          <button class="btn " :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Сменить пароль</span>
          </button>
        </div>
        </form>



      <form v-if="!reset && !resetM" name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Логин</label>
          <input
            v-model="user.username"
            v-validate="'required'"
            type="text"
            class="form-control"
            name="username"
          />
          <div
            v-if="errors.has('username')"
            class="alert alert-danger"
            role="alert"
          >Необходимо ввести логин</div>
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input
            v-model="user.password"
            v-validate="'required'"
            type="password"
            class="form-control"
            name="password"
          />
          <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >Необходимо ввести пароль</div>
        </div>
        <div class="form-group welcome2">
          <button class="btn " :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Войти</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
        </div>
      </form>
      <button v-if="!reset && !resetM" class="btn btn-link btn-anchor d-flex justify-content-end" @click="passReset" >
            Забыли пароль?
       </button>
    </div>
  </div>
</div>
</template>

<script>
import orangeBlock from '../components/orange-block.vue';
import User from '../models/user';
import {mapActions} from 'vuex'

export default {
  components: { orangeBlock },
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      reset:false,
      resetM:false,
      email:'',
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    ...mapActions([
            'RESET_PASS_EMAIL'
        ]),
    passReset(){
      this.reset = true
    },
    handlePassword(){
      this.$validator.validateAll().then(isValid => {
        
        if (this.email) {
          this.message = this.RESET_PASS_EMAIL(this.email)
          this.reset = false
          this.resetM = true
        }
      });
    },
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/profile');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    }
  }
};
</script>

<style lang="scss">
label {
  display: block;
  margin-top: 10px;
}

.card-container {
  max-width: 250px !important;
    margin: 0 auto 25px;
//   margin-top: 50px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;

  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
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