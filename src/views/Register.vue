<template>
<div>
  <orange-block org-bl-tit="Регистрация" org-bl-desc="Для регистрации в качестве волонтёра или координатора заполните форму регистрации"/>
  <div class="col-md-12">
    <register-form />
  </div>
</div> 
</template>

<script>
import orangeBlock from '../components/orange-block.vue'
import RegisterForm from '../components/register-form.vue'
export default {
  components: { orangeBlock, RegisterForm },

}
</script>

<style>

</style>