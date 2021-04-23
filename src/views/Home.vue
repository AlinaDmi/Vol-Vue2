<template>
    <div class="home">
        <p>{{title}}</p>
        <!--- Welcome Customer Section -->
<div class="container-fluid padding">
	<div class="row welcome d-flex justify-content-center">
		<div class="col-12 text-center">
			<h1 class="display-4">ПОЛУЧИ ПОМОЩЬ</h1>
		</div>
	
		<div class="col-xs-10 col-sm-10 col-md-8 col-lg-8 col-xl-6">
			<p class="lead">Помощь пожилым и маломобильным людям, а также медикам, сотрудникам социальных учреждений НКО и другим нуждающимся</p>
			<div class="text-center">
				<button type="button" class="btn btn-lg" onclick="document.location='application.html'">Оставить заявку</button>
			</div>
			
		</div>
		</div>
</div>

<!--- Welcome Volunteer Section -->
<div class="container-fluid padding">
	<div class="row welcome2 d-flex justify-content-center">
		
		<div class="col-12 text-center">
			<h1 class="display-4">ХОТИТЕ ПОМОЧЬ?</h1>
		</div>
	
		<div class="col-xs-10 col-sm-10 col-md-8 col-lg-8 col-xl-6">
			<p class="lead">Оказать помощь можно самыми разнообразными способами, такими как покупка и доставка продуктов, а также лекарств и товаров первой необходимости, автоволонтёрство и помощь сфере здравоохранения</p>
			<div class="text-center">
				<button type="button" class="btn btn-lg" onclick="document.location='reg.html'">Стать волонтёром</button>
			</div>
			
		</div>
	</div>
</div>
    </div>
</template>

<script>
export default{
name:'home',
components: {},
data(){
    return{
        title:'home'
    }
}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&family=Montserrat:wght@200;300;400;500&family=Nunito:wght@300&display=swap');
html, body{
  height: 100%;
  width: 100%;
  font-family: 'Montserrat', sans-serif;
}


/* font-family: 'Comfortaa', cursive;
font-family: 'Montserrat', sans-serif;
font-family: 'Nunito', sans-serif; */


.navbar{
  padding: .8rem;
}
.navbar-light .nav-item.active .nav-link,
.navbar-light .nav-item:focus .nav-link,
.navbar-light .nav-item:hover .nav-link {
        color: white;
        background-color: #7EBDC2;
        border-radius: 40px;
}

.navbar-nav li{
  padding-right: 10px;
  padding-left: 10px;
}

.nav-link{
  font-size: 1.1em !important;
  
}
.padding {
  padding-bottom: 2rem;
}
.welcome{
  margin: 0 auto;
  padding-top: 2rem;
  background-color: #FCB322;
  color: white;
}

.welcome .col-12 {
  padding-bottom: 0rem;
}

.welcome button{
  background-color:white;
  border-radius: 50px;
}
.welcome2 button{
  background-color:#FCB322;
  color: white; 
  border-radius: 50px;
}
.welcome2 button:hover, .welcome button:hover{
  background-color: #7EBDC2;
  color: white;
  transform: scale(1.1);
}

footer{
  background-color: #FCB322;
  color: white;
  padding-top: 2rem;
}

hr.light{
  border-top: 1px solid white;
  width: 75%;
  margin-top: .8rem;
  margin-bottom: 1rem;
}

.welcome h1, .welcome2 h1{
  font-weight: 500;
}





/*---Media Queries --*/
@media (max-width: 992px) {

  }
@media (max-width: 768px) {
  
}
@media (max-width: 576px) {
  
}


/*---Firefox Bug Fix --*/
.carousel-item {
  transition: -webkit-transform 0.5s ease;
  transition: transform 0.5s ease;
  transition: transform 0.5s ease, -webkit-transform 0.5s ease;
  -webkit-backface-visibility: visible;
  backface-visibility: visible;
}

/*--- Bootstrap Padding Fix --*/
[class*="col-"] {
    padding: 1rem;
}





/*
Extra small (xs) devices (portrait phones, less than 576px)
No media query since this is the default in Bootstrap

Small (sm) devices (landscape phones, 576px and up)
@media (min-width: 576px) { ... }

Medium (md) devices (tablets, 768px and up)
@media (min-width: 768px) { ... }

Large (lg) devices (desktops, 992px and up)
@media (min-width: 992px) { ... }

Extra (xl) large devices (large desktops, 1200px and up)
@media (min-width: 1200px) { ... }
*/









</style>