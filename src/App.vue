<template>
  <div id="app">
    <appHeader />
    <router-view/>
    <footer-cmp />
  </div>
</template>

<script>
import FooterCmp from './components/footer-cmp.vue';
import appHeader from './components/header.vue'
// import style from './assets/style.css'
export default {

  name: 'Home',
   components: {
        appHeader,
      FooterCmp
   },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },

  },
  methods: {

  }
};
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
