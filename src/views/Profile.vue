<template>
<div>
  <div class="container">
    <!-- <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul> -->
  </div>
  <profile-personal 
    :person="currentUser"
  />
  <!-- <profile-table /> -->
  <h3>Мои заказы</h3>
  <p v-if="!personalOrders.length">Заказов пока нет</p>
  <div class="catalog-personal_list">
            <orders-personal
                v-for="personalOrders in personalOrders"
                :key="personalOrders.id_ord"
                v-bind:order_data="personalOrders"
            />
  </div>
</div>
</template>

<script>

import {mapActions, mapState} from 'vuex'
import ordersPersonal from '../components/orders-personal.vue';
import ProfilePersonal from '../components/profile-personal.vue';
export default {
  components: { ordersPersonal, ProfilePersonal},
  name: 'Profile',
 data: function () {
    return {
      idus:0,
      role:''
    }
  },
  computed: {
    currentUser() {
      this.role = this.$store.state.auth.user.roleName;
      if(this.role === 'ROLE_VOL'){
        this.idus = this.$store.state.auth.user.user.id_vol;
      }
      return this.$store.state.auth.user;
    },
    ...mapState([
      'personalOrders'
    ])
  },

  methods: {
        ...mapActions([
            'GET_ORDERS_PERSONAL_API'
        ]),
    },
  mounted() {
    if(this.role === 'ROLE_VOL'){
      this.GET_ORDERS_PERSONAL_API(this.idus)
    }
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>

<style lang="scss">
    .catalog-personal {
        &_list{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            // height: 600px;
            overflow-y:scroll;
        }
    }

</style>