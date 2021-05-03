<template>
  <div class="selector ">

    <p class="my-1 text-left">Автомобиль:</p>
    <b-form-select v-model="selected" :options="options" size="sm" @change="onChange()"></b-form-select>
    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  
    
    <p class="my-1 text-left">Срочность:</p>
    <b-form-select v-model="selectedUrg" :options="optionsUrg" size="sm" @change="onChangeUrg()"></b-form-select>
    <div class="mt-3">Selected: <strong>{{ selectedUrg }}</strong></div>

    <!-- <button @click="dropFilters" type="button" class="btn btn-outline-info mx-auto d-block">
        Сбросить
    </button> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: null,
        selectedUrg: null,
        isDroppedLocal: false,
        options: [
          { value: null, text: 'Всё' },
          { value: 'да', text: 'Необходим' },
          { value: 'нет', text: 'Не нужен' },],
        optionsUrg: [
          { value: null, text: 'Всё' },
          { value: 'срочно', text: 'Срочно' },
          { value: 'нет', text: 'Не срочно' },]
      }
    },
     props:
        ['isDropped'],
      watch: { 
      isDropped: {
            // the callback will be called immediately after the start of the observation
           immediate: true, 
          handler (val, oldVal) {
              console.log('Prop changed: ', val, ' | was: ', oldVal);
              this.isDroppedLocal = val
              if(this.isDroppedLocal === true){
            console.log('ready to drop')
            this.selected = null,
            this.selectedUrg = null,
            this.$emit('clickedCar', this.selected),
            this.$emit('clickedUrg', this.selectedUrg)
            this.isDroppedLocal=false
            console.log('dropped')
              }
           }
       }
      },
     computed: {
        // droppAll(){
        //   if(this.isDropped === true){
        //     console.log('ready to drop',this.isDropped)
        //     // this.selected = null,
        //     // this.selectedUrg = null,
        //     // this.$emit('clickedCar', this.selected),
        //     // this.$emit('clickedUrg', this.selectedUrg)
        //   }

        // }
     },
    methods:{
        onChange: function() {
        this.$emit('clickedCar', this.selected)
     },
         onChangeUrg: function() {
        this.$emit('clickedUrg', this.selectedUrg)
     },
      // dropMethod(selected,selectedUrg){
      //   if(this.this.isDropped){
      //       console.log('ready to drop',this.this.isDropped)
      //       this.selected = null,
      //       this.selectedUrg = null,
      //       this.$emit('clickedCar', this.selected),
      //       this.$emit('clickedUrg', this.selectedUrg)
      //     }
      // }
    }
  }
</script>

<style lang="scss">
    // .selector p {
    //     max-width: 300px !important;
    // }
</style>