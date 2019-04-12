<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">User Management</div>
        <div class="container">
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Employee ID: </label>
              <input type="text" class="form-control form-control-sm">
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Employee Name: </label>
              <input type="text" class="form-control form-control-sm">
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-6 text-right">
              <button class="btn btn-info" @click="search">Search</button>
            </div>
            <div class="col-md-6">
              <button class="btn btn-danger">Clear</button>
            </div>
          </div>
        </div>
        <table class="table table-bg" v-if="isSearch">
          <thead class="table-head text-center">
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Admin</th>
          </thead>
          <tbody>
            <router-link v-for="user in users" :key="user.id" :to="{path: `/user_management_form/${user.id}`}" tag="tr">
              <td>{{ user.first_name + ' ' + user.last_name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.username }}</td>
              <td cas><div :class="isAdmin(user.is_admin)"></div></td>
            </router-link>
            <tr v-show="!users.length">
              <td class="text-center" colspan="4">No Data</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>

import { mapFields } from 'vuex-map-fields'

export default {
  data () {
    return {
      user: {
        code: '',
        name: ''
      },
      isSearch: false
    }
  },
  methods: {
    search () {
      this.$store.dispatch('user/searchUser', { ...this.user })
        .then(() => {
          this.isSearch = true
        })
    },
    isAdmin(admin) {
      return parseInt(admin) ? 'admin-user' : 'normal-user'
    }
  },
  computed: {
    ...mapFields('user', [
      'users'
    ])
  }
}
</script>

<style lang="scss" scoped>
  table {
    .admin-user {
      width: 20px;
      height: 20px;
      background-color: green;
    }
    .normal-user {
      width: 20px;
      height: 20px;
      background-color: red;
    }
  }
</style>
