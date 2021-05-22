
<template>

<div class="container-fluid welcome mb-4" id="personal_page">

     <b-container class="my-3">
     <router-link to="/settings">
      <img style="float:right" class="img-fluid icon rot" src="../assets/pics/settings.svg"/>
     </router-link>
     <h2>{{curPerson.name}}</h2>
        <p class="type-user">{{role}}</p>
        
        <b-row>
            <b-col class="my-0 py-0">
                {{curPerson.city}}
            </b-col>
            <b-col  class="my-0 py-0">
                {{curPerson.email}}
            </b-col>
        </b-row>
        <b-row>
            <b-col class="my-0 py-0">
              <div v-if="role === 'Волонтёр'"> Пол: {{curPerson.gender}} </div>
            </b-col>
            <b-col  class="my-0 py-0">
                {{curPerson.phone}}
            </b-col>
        </b-row>     
        <b-row class="">
            <b-col class="mb-4">
             <div v-if="role === 'Волонтёр'">  Наличие автомобиля: {{curPerson.car}} </div>
            </b-col>
            <b-col  class="mb-4">

            </b-col>
        </b-row>             
     </b-container>

</div>
</template>

<script>
export default {
    props:['person'],
    data(){
        return{
        }
    },
    computed:{
            curPerson(){
            return this.person.user
        },
        role(){
            if(this.person.roleName === 'ROLE_VOL'){
            return 'Волонтёр'
            } else{
                return 'Координатор'
            }
        }
    }
}
</script>

<style>

</style>