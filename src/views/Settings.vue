<template>
<div>
  <orange-block org-bl-tit="Настройки"/>
  <b-container>
    <b-row>
      <b-col sm>
        <set-form />
      </b-col>
      <b-col sm>
        <edit-pass />
      </b-col>
    </b-row>
  </b-container>
  
</div>
</template>

<script>
import EditPass from '../components/edit-pass.vue'
import orangeBlock from '../components/orange-block.vue'
import SetForm from '../components/set-form.vue'
export default {
  components: { orangeBlock, SetForm, EditPass },

}
</script>

<style>

</style>