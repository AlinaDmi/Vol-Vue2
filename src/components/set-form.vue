<template>
<div>
  <div class="col-md-12">
    <div class="card-container">

      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
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
          >Username is required!</div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
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
          >Password is required!</div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
        </div>
      </form>
    </div>
  </div>

 <div class="row">
        <div class="col-md-10 mx-auto">
            <form>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label for="inputFirstname">First name</label>
                        <input type="text" class="form-control" id="inputFirstname" placeholder="First name">
                    </div>
                    <div class="col-sm-6">
                        <label for="inputLastname">Last name</label>
                        <input type="text" class="form-control" id="inputLastname" placeholder="Last name">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label for="inputAddressLine1">Address</label>
                        <input type="text" class="form-control" id="inputAddressLine1" placeholder="Street Address">
                    </div>
                    <div class="col-sm-6">
                        <label for="inputAddressLine2">Address (Line 2)</label>
                        <input type="text" class="form-control" id="inputAddressLine2" placeholder="Line 2">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label for="inputCity">City</label>
                        <input type="text" class="form-control" id="inputCity" placeholder="City">
                    </div>
                    <div class="col-sm-3">
                        <label for="inputState">State</label>
                        <input type="text" class="form-control" id="inputState" placeholder="State">
                    </div>
                    <div class="col-sm-3">
                        <label for="inputPostalCode">Postal Code</label>
                        <input type="text" class="form-control" id="inputPostalCode" placeholder="Postal Code">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label for="inputContactNumber">Contact Number</label>
                        <input type="number" class="form-control" id="inputContactNumber" placeholder="Contact Number">
                    </div>
                    <div class="col-sm-6">
                        <label for="inputWebsite">Website</label>
                        <input type="text" class="form-control" id="inputWebsite" placeholder="Website">
                    </div>
                </div>
                <button type="button" class="btn btn-primary px-4 float-right">Save</button>
            </form>
        </div>
    </div>

</div>  
</template>

<script>
import User from '../models/user';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
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

  },
  methods: {
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

<style scoped lang="scss">
label {
  display: block;
  margin-top: 10px;
}

.card-container {
  max-width: 500px !important;
  padding: 40px 40px;
    margin: 0 auto 25px;
//   margin-top: 50px;
}

// .card {
//   background-color: #f7f7f7;
//   padding: 20px 25px 30px;

//   -moz-border-radius: 2px;
//   -webkit-border-radius: 2px;
//   border-radius: 2px;
//   -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
//   -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
//   box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
// }

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