<template>
  <div class="welcome2">
  <button class="btn mx-2" v-b-modal.modal-center>Получить отчёт</button>
  <button v-if="currentUser.roleName === 'ROLE_VOL' && !fileRep" class="btn" v-b-modal.modal-center-rep>Добавить отчёт</button>
  
  <b-modal hide-footer id="modal-center" centered title="Получить отчёт">
    <div class="col-md-12">
    <div class="card-container">
      <p><b>Затрачено часов: </b> {{fileRep.hours}}</p>
      <p><b>Отчёт: </b> {{fileRep.report}}</p>
    </div>
    </div>
  </b-modal>

  <b-modal hide-footer id="modal-center-rep" centered title="Добавить отчёт">
    <div class="col-md-12">
    <div class="card-container">

      <form name="form" @submit.prevent="handleSet">
           <!-- Часы -->
          <div class="form-group my-1 text-left">
            <label for="number">Затрачено часов</label>
            <input
              v-model="hours"
              v-validate="'required|min:1'"
              type="number"
              step="0.5"
              class="form-control"
              name="number"
            />
            <div
              v-if="submitted && errors.has('number')"
              class="alert-danger"
            >{{errors.first('number')}}</div>
          </div>
           <!-- Отчёт-->
          <div class="form-group my-1 text-left">
            <label for="ord_descript" class="my-1 text-left">Отчёт о выполнении</label>
            <textarea
              v-model="report"
              v-validate="'required|min:3|max:1300'"
              type="text"
              class="form-control"
              name="ord_descript"
            />
            <div
              v-if="submitted && errors.has('ord_descript')"
              class="alert-danger"
            >{{errors.first('ord_descript')}}</div>
          </div>

          <div class="form-group welcome2 d-flex justify-content-center">
            <button class="btn my-4 " :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Отправить</span>
            </button>
          </div>
      </form>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
      
    </div>    
    </div>
  </b-modal>
</div>
</template>

<script>
import {mapActions} from 'vuex'
import files from './files.vue'
export default {
  components: { files },
    name:'modal',
    props:['id_ord','id_vol'],
    data() {
      return {
        hours: '',
        report:'',
        fileRep:[],
        submitted: false,
        successful: false,
        loading: false,
        message: ''
      }
    },
    computed: {
      currentUser() {
      return this.$store.state.auth.user;
      },
    },
    mounted () {
      this.GET_VOL_REPORT(this.id_ord).then(
        data => {
              this.fileRep = data.data
            }
      )
    },
    methods: {
    ...mapActions([
          'VOL_REPORT',
          'GET_VOL_REPORT'
      ]),

    handleSet() {
      this.loading = true;
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
            this.VOL_REPORT({report:this.report,time:this.hours,idOrder:this.id_ord}).then(
            data => {
              this.loading = false;
              this.message = 'Очёт добавлен!';
              console.log(data)
              this.successful = true;
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
    }
      });
    }
    },
}
</script>

<style>

</style>