<template>
  <div id="app">
    <appHeader />
    <router-view/>
  </div>
</template>

<script>
import appHeader from './components/HeaderV.vue'

export default {

  name: 'Home',

   components: {
        appHeader
   }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
