<template>
  <div class="selector ">

    <p class="my-1 text-left">Автомобиль:</p>
    <b-form-select v-model="selected" :options="options" size="sm" @change="onChange()"></b-form-select>
   
    <p class="my-1 text-left">Срочность:</p>
    <b-form-select v-model="selectedUrg" :options="optionsUrg" size="sm" @change="onChangeUrg()"></b-form-select>


    <div v-if="currentUser.roleName === 'ROLE_CORD'">
    <p class="my-1 text-left">Статус:</p>
    <b-form-select v-model="selectedStat" :options="optionsStat" size="sm" @change="onChangeStat()"></b-form-select>    
    

       <p class="my-1 text-left">Город:</p>
                <b-form-select size="sm" v-model="selectedCity" @change="onChangeCity()">
                 <b-form-select-option :value="null">Всё</b-form-select-option>
                    <option v-for="city in cities"
                    :key="city.idcity"
                    v-bind:value="city.name">{{city.name}}</option>
                </b-form-select>
    </div>
    <p class="my-1 text-left">Район:</p>
                <b-form-select size="sm" v-model="selectedDistr" @change="onChangeDistr()">
                 <b-form-select-option :value="null">Всё</b-form-select-option>
                    <option v-for="district in districts"
                    :key="district.iddistrict"
                    v-bind:value="district.name">{{district.name}}</option>
                </b-form-select>

     <button @click="dropAll" type="button" class="btn-out mx-1 my-2">
                        Сбросить
      </button>           

  </div>
</template>

<script>
import {mapActions, mapGetters,mapState} from 'vuex'
  export default {
    data() {
      return {
        selected: null,
        selectedUrg: null,
        selectedStat: null,
        selectedDistr: null,
        selectedCity: null,
        districts: [],
        options: [
          { value: null, text: 'Всё' },
          { value: 'да', text: 'Необходим' },
          { value: 'нет', text: 'Не нужен' },],
        optionsUrg: [
          { value: null, text: 'Всё' },
          { value: 'срочно', text: 'Срочно' },
          { value: 'нет', text: 'Не срочно' },],
          optionsStat: [
          { value: null, text: 'Всё' },
          { value: 'в рассмотрении', text: 'В рассмотрении' },
          { value: 'активен', text: 'Активен' },
          { value: 'принят к исполнению', text: 'Принят к исполнению' }]
      }
    },

      mounted() {
      this.GET_CITIES(),
      this.districts = this.GET_DISTRICTS()

      this.$store.watch(
      state => state.districts,
      () => {
        this.districts = this.getDistrictByCity(this.currentUser.user.city)
        console.log("update");
      }
    );
    },
     computed: {
     currentUser() {
      return this.$store.state.auth.user;
    },
      ...mapState([
        'cities'
    ]),
    ...mapGetters([
       'getDistrictByCity'
    ]),

     },

    methods:{
      ...mapActions([
            'GET_DISTRICTS',
            'GET_CITIES'
        ]),
        onChange: function() {
        this.$emit('clickedCar', this.selected)
     },
         onChangeUrg: function() {
        this.$emit('clickedUrg', this.selectedUrg)
     },
          onChangeStat: function() {
        this.$emit('clickedStat', this.selectedStat)
     },
          onChangeDistr: function() {
        this.$emit('clickedDistr', this.selectedDistr)
     },
        onChangeCity: function() {
        this.$emit('clickedCity', this.selectedCity)
        this.districts = this.getDistrictByCity(this.selectedCity)
     },
      dropAll(){
          this.selected = null,
            this.selectedUrg = null,
            this.selectedStat = null,
            this.selectedDistr = null,
            this.selectedCity = null,
            this.districts = null
            this.$emit('clickedCity', this.selectedCity)
            this.$emit('clickedCar', this.selected),
            this.$emit('clickedUrg', this.selectedUrg),
            this.$emit('clickedStat', this.selectedStat),
            this.$emit('clickedDistr', this.selectedDistr)
      }
    }
  }
</script>

<style lang="scss">
    // .selector p {
    //     max-width: 300px !important;
    // }
</style>