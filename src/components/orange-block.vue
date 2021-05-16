<template>
  <div class="container-fluid padding">
	<div class="row welcome d-flex justify-content-center">
		<div class="col-12 text-center">
			<h1>{{orgBlTit}}</h1>
		</div>
	
		<div class="col-xs-10 col-sm-10 col-md-8 col-lg-8 col-xl-6 py-1">
			<p class="lead">{{orgBlDesc}}</p>
			
		</div>
	</div>
</div>
</template>

<script>
export default {
    props:['orgBlTit', 'orgBlDesc']
}
</script>

<style>

</style>