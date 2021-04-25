<template>
  <div id="nav">
    <nav class="navbar navbar-expand-md navbar-light bg-light sticky-top">
	<div class="container-fluid">
		<a class="navbar-brand" href="#">
			<img src="../assets/pics/logo.svg" alt="logo">
			<img src="../assets/pics/logo_m.svg" alt="logo_m">
		</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
			<span >
				<img src="../assets/pics/phone_menu.svg">
			</span>
		</button>
    <!-- Почему не работает адаптивный навбар?? сделать! -->
		<div class="collapse navbar-collapse" id="navbarResponsive">
			<ul class="navbar-nav ml-auto">
				<!-- <li class="nav-item ">
					<a class="nav-link" href="application.html">Заявка на помощь</a>
				</li> -->
        <li class="nav-item ">
					<router-link class="nav-link" to="/">Главная</router-link>
				</li>
        <li class="nav-item ">
					<router-link class="nav-link" to="/catalog">Каталог</router-link>
				</li>
        <li class="nav-item ">
					<router-link class="nav-link" to="/profile">Профиль</router-link>
				</li>
        <li class="nav-item ">
					<router-link class="nav-link" to="/login">Вход</router-link>
				</li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            Выйти
          </a>
        </li>
			</ul>
		</div>
	</div>
</nav>
      
    </div>

    
</template>

<script>

export default {
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