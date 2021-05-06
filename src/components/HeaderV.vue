<template>
  <div id="nav">
    <!-- <nav class="navbar navbar-expand-md navbar-light bg-light sticky-top">
	<div class="container-fluid">
		<a class="navbar-brand">
			<img src="../assets/pics/logo.svg" alt="logo">
			<img src="../assets/pics/logo_m.svg" alt="logo_m">
		</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
			<span >
				<img src="../assets/pics/phone_menu.svg">
			</span>
		</button>
    <nav class="navbar navbar-expand navbar-light bg-light">

      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            Главная
          </router-link>
        </li>
        <li class="nav-item ">
					<router-link class="nav-link" to="/catalog">Каталог</router-link>
				</li>

      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            Регистрация
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            Вход
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            Выход
          </a>
        </li>
      </div>
    </nav>

	</div>
</nav> -->

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
            <li class="nav-item">
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
            <li v-if="currentUser" class="nav-item ">
              <router-link class="nav-link" to="/catalog">Заказы</router-link>
            </li> 
            <li v-if="currentUser" class="nav-item">
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