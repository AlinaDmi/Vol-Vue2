<template>
<div class="col-md-12">
 <div class="card-container">
  <!-- Пароль --> 
  <form name="form" @submit.prevent="handlePas">
          <div class="input-group">
            <label for="password" class="mr-1">Пароль</label>

                <div class="input-fields d-flex">
                    <input v-validate="'required'" name="password" type="password" class="form-control mr-1" placeholder="Password" ref="password">

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
  </form>
  </div>
</div>
</template>

<script>
export default {

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