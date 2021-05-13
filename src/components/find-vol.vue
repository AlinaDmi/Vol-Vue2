<template>
    <div class="vol-item mx-auto my-2 p-4">
        <div v-if="message" class="alert alert-success">
          Предложение отправлено
        </div>
        <h6 id="item-header" class="catalog-item_title content-center">{{vol_data.name}}</h6>
        <p class="catalog-item_adr">{{vol_data.city}}</p>
        <p >Автомобиль: {{vol_data.car}}</p>
        <button @click="offerVol" type="button" class="btn-out mx-auto d-block my-1">
            Предложить к исполнению
        </button>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
 export default {
    name:'volFind',
    data() {
      return {
        message:'',
      }
    },
    props: {
      ord:'',
      vol_data: {
          type: Object,
          default() {
              return{}
          }
      }
    },
    computed: {
      curCord() {
        return this.$store.state.auth.user.user.id_cord;
      }
    },
    methods: {
      ...mapActions([
        'OFFER'
      ]),
      sendDataToParent(){
        this.$emit('sendID',this.vol_data.id_vol);
      },
      offerVol(){
        this.message = ''
        this.message = this.OFFER({vol: this.vol_data.id_vol, cord: this.curCord, ord: this.ord})
      }
    },
}
</script>

<style lang="scss">
    .vol-item {
       flex-basis: 85%;
       box-shadow: 0 0 8px 0 #e0e0e0;
       padding: 4;
       text-align: left;
      //  margin: auto;
    }
    #item-header{
        text-align: center;
    }
</style>