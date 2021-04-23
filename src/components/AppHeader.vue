<template>
  <nav id="header" class="w-full content-end bg-gradient-to-r from-yellow-500 to-yellow-300 text-white px-4 py-5"
  >
    
    <router-link class="mx-2 " to="/catalog">Заказы</router-link>
    <router-link class="mx-2" to="/home">Главная</router-link>
  
  </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    #header{
        text-align: right;
    }</style>