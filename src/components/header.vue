<template>
  <div id="nav">
  
  <!-- Адаптивнй -->
  <b-navbar toggleable="lg" type="light" variant="light fixed-top" >
        <b-navbar-brand>
          <img src="../assets/pics/logo.svg" alt="logo">
			    <img src="../assets/pics/logo_m.svg" alt="logo_m">
        </b-navbar-brand>

        <b-navbar-toggle target="navbar-toggle-collapse"></b-navbar-toggle>

        <b-collapse id="navbar-toggle-collapse" is-nav>
          <!-- For all -->
          <b-navbar-nav class="ml-auto">
            <li v-if="!currentUser" class="nav-item">
              <router-link to="/" class="nav-link">
                Главная
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/sendorder" class="nav-link">
                Заявка на помощь
              </router-link>
            </li>
            
            
       
        <!-- Not Logged in -->
           
              <li v-if="!currentUser" class="nav-item">
                <router-link to="/register" class="nav-link">
                  Регистрация
                </router-link>
              </li>
              <li v-if="!currentUser" class="nav-item">
                <router-link to="/login" class="nav-link">
                  Вход
                </router-link>
              </li>
        
          <!-- Logged in -->
            <li v-if="currentUser && currentUser.roleName === 'ROLE_VOL'" class="nav-item ">
              <router-link class="nav-link" to="/offers">Предложения</router-link>
            </li> 
            <li v-if="currentUser && (currentUser.roleName === 'ROLE_VOL' || currentUser.roleName === 'ROLE_CORD')" class="nav-item ">
              <router-link class="nav-link" to="/catalog">Заказы</router-link>
            </li>
            <li v-if="currentUser && (currentUser.roleName === 'ROLE_VOL' || currentUser.roleName === 'ROLE_CORD')" class="nav-item">
              <router-link to="/profile" class="nav-link">
                Профиль
              </router-link>
            </li>
            <li v-if="currentUser" class="nav-item">
              <a class="nav-link" href @click.prevent="logOut">
                Выход
              </a>
            </li>
      </b-navbar-nav>
          
        </b-collapse>
      </b-navbar>

  </div>

    
</template>

<script>

export default {
  name: 'Header',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
     color: white;
        background-color: #7EBDC2;
        border-radius: 40px;
    }
  }
}
</style>