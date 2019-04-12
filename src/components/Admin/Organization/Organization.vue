<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Organization Management</div>
        <div class="container">
          <div class="row form-group">
            <div class="col-md-4">
              <label for="" class="font-normal">Organization Type </label>
              <v-select
                @input="selectOrgType"
                :value="creatorOrgType"
                :options="orgType"></v-select>
            </div>
            <div class="col-md-3">
              <label for="" class="font-normal">Organization Code </label>
              <v-select
                v-model="creatorOrgSelected"
                label="code"
                :options="orgUnits"></v-select>
            </div>
            <div class="col-md-5">
              <label for="" class="font-normal">Organization Name </label>
              <v-select
                v-model="creatorOrgSelected"
                label="name"
                :options="orgUnits"></v-select>
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
            <th>Organization Type</th>
            <th>Organization Code</th>
            <th>Organization Name</th>
            <th>Creator</th>
            <th>Approver</th>
          </thead>
          <tbody>
            <router-link v-for="org in orgs" :key="org.id" :to="{path: `/organization_management_form/${org.id}`}" tag="tr">
              <td>{{ org.type }}</td>
              <td>{{ org.code }}</td>
              <td>{{ org.name }}</td>
              <td>{{ org.creator.first_name + ' ' + org.creator.last_name }}</td>
              <td>{{ org.step1_approver.first_name + ' ' + org.step1_approver.last_name }}</td>
            </router-link>
            <tr v-show="!orgs.length">
              <td class="text-center" colspan="5">No Data</td>
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
      isSearch: false,
      creatorOrgType: null,
      creatorOrgSelected: null,
      creatorOrg: []
    }
  },
  created () {
    console.log(this.orgs)
  },
  methods: {
    selectOrgType (type) {
      this.$store.dispatch('organization/searchOrg', type)
    },
    search () {
      if (!this.orgs.length) this.$store.dispatch('organization/searchOrg')
      this.isSearch = true
    }
  },
  computed: {
    ...mapFields(`organization`, [
      'typeSelected',
      'yearSelected',
      'orgSelected',
      'orgUnits',
      'orgType',
      'orgs'
    ])
  }
}
</script>

<style>

</style>
