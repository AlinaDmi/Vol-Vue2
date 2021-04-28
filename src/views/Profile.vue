<template>
<div>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    <!-- <p>
      <strong>Token:</strong>
      {{currentUser.token}}
    </p> -->
    <p>
      <strong>Id:</strong>
      {{currentUser.volunteer.id_vol}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.volunteer.email}}
    </p>

    <!-- <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul> -->
  </div>
  <div class="catalog_list">
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
export default {
  components: { ordersPersonal },
  name: 'Profile',
 data: function () {
    return {
      idus:0
    }
  },
  computed: {
    currentUser() {
      this.idus = this.$store.state.auth.user.volunteer.id_vol;
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
    this.GET_ORDERS_PERSONAL_API(this.idus)
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>