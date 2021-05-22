<template>
<div>
  <orange-block org-bl-tit="Админ-панель"/>
      <div class="card-container welcome2 mb-5">
        <div
            v-if="message"
            class="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
            >{{message}}
        </div>
        <b-row>
            <b-col sm class="my-0 py-0">
              <label for="Название">Код волонтёра</label>
            <input
              v-model="unumber"
              type="text"
              class="form-control"
              name="Название"
            />
            </b-col>
            <b-col sm class="my-0 py-0 mt-2">
                <div class="form-group ">
                    <button class="btn my-4 " @click="addVolCode"> Добавить код</button>
                </div>
            </b-col>
        </b-row>
                <b-row>
            <b-col sm class="my-0 py-0">
              <label for="Название">Код координатора</label>
            <input
              v-model="cnumber"
              type="text"
              class="form-control"
              name="Название"
            />
            </b-col>
            <b-col sm class="my-0 py-0 mt-2">
                <div class="form-group ">
                    <button class="btn my-4 " @click="addCordCode"> Добавить код</button>
                </div>
            </b-col>
        </b-row>
      </div>
</div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import orangeBlock from '../components/orange-block.vue';
export default {
   name:"Admin",
  components: { orangeBlock },
  data() {
      return {
          unumber: '',
          cnumber:'',
          successful: false,
          message: ''
      }
  },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        ...mapActions([
            'ADD_CODE_CORD',
            'ADD_CODE_VOL'
        ]),
        addVolCode(){
            this.message = ''
            if(this.unumber){
                this.ADD_CODE_VOL(this.unumber)
                this.successful = true
                this.message = 'Код волонтёра добавлен!'
            } else {
                this.successful = false
                this.message = 'Необходимо ввести код волонтёра!'
            }
            
        },
        addCordCode(){
            this.message = ''
            if(this.cnumber){
                this.ADD_CODE_CORD(this.cnumber)
                this.successful = true
                this.message = 'Код координатора добавлен!'
            } else {
                this.successful = false
                this.message = 'Необходимо ввести код координатора!'
            }
            
        }

    },
}
</script>

<style>

</style>