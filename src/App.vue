<template>
  <div id="app">
    <appHeader />
    <router-view/>
  </div>
</template>

<script>
import appHeader from './components/HeaderV.vue'
// import style from './assets/style.css'
export default {

  name: 'Home',

   components: {
        appHeader
   },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    // showAdminBoard() {
    //   if (this.currentUser && this.currentUser.roles) {
    //     return this.currentUser.roles.includes('ROLE_ADMIN');
    //   }
    //   return false;
    // },
    // showModeratorBoard() {
    //   if (this.currentUser && this.currentUser.roles) {
    //     return this.currentUser.roles.includes('ROLE_MODERATOR');
    //   }
    //   return false;
    // }
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
