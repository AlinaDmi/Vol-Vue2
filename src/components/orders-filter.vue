<template>
  <div class="selector">
    <p>Автомобиль:</p>
    <b-form-select v-model="selected" :options="options" size="sm" class="mt-3" @change="onChange()"></b-form-select>
    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: null,
        options: [
          { value: null, text: 'Любое' },
          { value: 'да', text: 'Необходим' },
          { value: 'нет', text: 'Не нужен' },]
      }
    },
    methods:{
        onChange: function() {
    	console.log(this.selected)
        this.$emit('clickedCar', this.selected)
     }
    }
  }
</script>

<style lang="scss">
    .selector {
        max-width: 300px !important;
    }
</style>