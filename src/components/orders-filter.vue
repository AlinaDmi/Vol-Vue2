<template>
  <div class="selector ">

    <p class="my-1 text-left">Автомобиль:</p>
    <b-form-select v-model="selected" :options="options" size="sm" @change="onChange()"></b-form-select>
    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  
    
    <p class="my-1 text-left">Срочность:</p>
    <b-form-select v-model="selectedUrg" :options="optionsUrg" size="sm" @change="onChangeUrg()"></b-form-select>
    <div class="mt-3">Selected: <strong>{{ selectedUrg }}</strong></div>
  
  
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: null,
        selectedUrg: null,
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
    methods:{
        onChange: function() {
        this.$emit('clickedCar', this.selected)
     },
         onChangeUrg: function() {
        this.$emit('clickedUrg', this.selectedUrg)
     }
    }
  }
</script>

<style lang="scss">
    // .selector p {
    //     max-width: 300px !important;
    // }
</style>