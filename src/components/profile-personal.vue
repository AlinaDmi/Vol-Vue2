<template>

<div class="container-fluid welcome" id="personal_page">
    <div class="row padding">
		
		<div class="col-lg-6 text-center pp">
			<img src="img/svg/ava.png" class="img-fluid" id="ava">
		</div>
        <div class="col-lg-6 cont">
            <h2>{{curPerson.name}}</h2>
			
            <p class="type-user">{{role}}</p>

			<div class="row padding">
				<div class="col">
					<p>Пол: {{curPerson.gender}} <br>Возраст</p>
				</div>
				<div class="col">
					<p>{{curPerson.email}} <br>
					{{curPerson.phone}}</p>		
				</div>
			</div>
			<p>Выполнено заказов:</p>
			
			<div class="col-lg-6 text-right">
				<router-link to="/settings">
					<img src="../assets/pics/settings.svg" class="img-fluid icon rot">
				</router-link>
				<!-- <img src="img/svg/logout.svg" class="img-fluid icon"> -->
			</div>
			
        </div>
    </div>

	 <!-- <div class="row">
        <div class="col-md-10 mx-auto">
            <form>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label for="inputFirstname">First name</label>
                        <input type="text" class="form-control" id="inputFirstname" placeholder="First name">
                    </div>
                    <div class="col-sm-6">
                        <label for="inputLastname">Last name</label>
                        <input type="text" class="form-control" id="inputLastname" placeholder="Last name">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label for="inputAddressLine1">Address</label>
                        <input type="text" class="form-control" id="inputAddressLine1" placeholder="Street Address">
                    </div>
                    <div class="col-sm-6">
                        <label for="inputAddressLine2">Address (Line 2)</label>
                        <input type="text" class="form-control" id="inputAddressLine2" placeholder="Line 2">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label for="inputCity">City</label>
                        <input type="text" class="form-control" id="inputCity" placeholder="City">
                    </div>
                    <div class="col-sm-3">
                        <label for="inputState">State</label>
                        <input type="text" class="form-control" id="inputState" placeholder="State">
                    </div>
                    <div class="col-sm-3">
                        <label for="inputPostalCode">Postal Code</label>
                        <input type="text" class="form-control" id="inputPostalCode" placeholder="Postal Code">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label for="inputContactNumber">Contact Number</label>
                        <input type="number" class="form-control" id="inputContactNumber" placeholder="Contact Number">
                    </div>
                    <div class="col-sm-6">
                        <label for="inputWebsite">Website</label>
                        <input type="text" class="form-control" id="inputWebsite" placeholder="Website">
                    </div>
                </div>
                <button type="button" class="btn btn-primary px-4 float-right">Save</button>
            </form>
        </div>
    </div> -->

</div>
</template>

<script>
export default {
    props:['person'],
    data(){
        return{
            role:'Волонтёр'
        }
    },
    computed:{
        curPerson(){
            if (this.person.roleName === 'ROLE_VOL'){
                return this.person.user
            } else {
                this.role = 'Координатор'
                return this.person.user
            }
            
        }
    }
}
</script>

<style>

</style>