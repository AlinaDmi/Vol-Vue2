<template>
    <div class="home">
        
        <!--- Welcome Customer Section -->
	<div class="container-fluid padding">
	<div class="row welcome d-flex justify-content-center">
		<div class="col-12 text-center">
			<h1 class="display-4">ПОЛУЧИ ПОМОЩЬ</h1>
		</div>
	
		<div class="col-xs-10 col-sm-10 col-md-8 col-lg-8 col-xl-6">
			<p class="lead">Помощь пожилым и маломобильным людям, а также медикам, сотрудникам социальных учреждений НКО и другим нуждающимся</p>
			<div class="text-center">
				<button type="button" class="btn btn-lg" @click="$router.push('/sendorder')">Оставить заявку</button>
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
				<button type="button" class="btn btn-lg" @click="$router.push('/register')">Стать волонтёром</button>
			</div>
			
		</div>
	</div>
</div>

    </div>
</template>

<script>

export default{
name:'home'

// ,
// data(){
//     // return{
//     //     title:'home'
//     // }
// }
}
</script>

<style>
  

</style>