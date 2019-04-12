<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Add / Edit User Permission</div>
        <div class="container">
          <div class="row">
            <div class="col-md-8 offset-md-2">
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Employee Code:
                </div>
                <div class="col-md-8">
                  <input type="text" class="form-control form-control-sm" v-model="user.employee_code" disabled>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Employee Name:
                </div>
                <div class="col-md-8">
                  <input type="text" class="form-control form-control-sm" v-model="fullName" disabled>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Email:
                </div>
                <div class="col-md-8">
                  <input type="text" class="form-control form-control-sm" v-model="user.email" disabled>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  User Name:
                </div>
                <div class="col-md-8">
                  <input type="text" class="form-control form-control-sm" v-model="user.username" disabled>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-12 text-center">
                  <button class="btn btn-primary">Save</button>
                  <button class="btn btn-danger" @click="$router.go(-1)">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                Creator Of Organization
              </div>
              <div class="card-body">
                <div class="row form-group">
                  <div class="col-md-3">
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
                  <div class="col-md-1">
                    <font-awesome-icon
                      icon="plus-circle"
                      class="add-icon"
                      @click="addCreatorOrg"/>
                  </div>
                </div>
                <div
                  class="row border-bottom form-group"
                  v-for="org in creatorOrg" :key="org.id">
                  <div class="col-md-3">{{ org.type }}</div>
                  <div class="col-md-3">{{ org.code }}</div>
                  <div class="col-md-5">{{ org.name }}</div>
                  <div class="col-md-1">
                    <font-awesome-icon
                      icon="times"
                      class="remove-icon"
                      @click="removeCreatorOrg(org.id)"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                Approver Of Organization
              </div>
              <div class="card-body">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  data () {
    return {
      isActive: '',
      creatorOrgType: null,
      creatorOrgSelected: null,
      creatorOrg: []
    }
  },
  created () {
    if (this.$route.params.id !== undefined) {
      this.$store.dispatch('user/getUserById', this.$route.params.id)
    }
  },
  methods: {
    selectOrgType (type) {
      this.$store.dispatch('organization/searchOrg', type)
    },
    addCreatorOrg () {
      if (this.creatorOrgSelected !== null) this.creatorOrg.push(this.creatorOrgSelected)
      this.creatorOrgSelected = null
      this.creatorOrgType = null
    },
    removeCreatorOrg (orgId) {
      this.creatorOrg = this.creatorOrg.filter(obj => {
        return obj.id !== orgId
      })
    }
  },
  computed: {
    ...mapFields('user', [
      'user'
    ]),
    ...mapFields(`organization`, [
      'typeSelected',
      'yearSelected',
      'orgSelected',
      'orgUnits',
      'orgType'
    ]),
    fullName () {
      return `${this.user.first_name} ${this.user.last_name}`
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  button {
    margin-right: 5px;
  }
}
</style>
