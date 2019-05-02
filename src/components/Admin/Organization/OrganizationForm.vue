<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Edit Organization Permission</div>
        <div class="container">
          <div class="row">
            <div class="col-md-8 offset-md-2">
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Organization Type:
                </div>
                <div class="col-md-8">
                  <input type="text" class="form-control form-control-sm" v-model="org.type" disabled>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Organization Code:
                </div>
                <div class="col-md-8">
                   <input type="text" class="form-control form-control-sm" v-model="org.code" disabled>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Organization Name:
                </div>
                <div class="col-md-8">
                   <input type="text" class="form-control form-control-sm" v-model="org.name" disabled>
                </div>
              </div>
               <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Creator:
                </div>
                <div class="col-md-8">
                   <v-select
                      v-model="org.creator"
                      label="label"
                      :options="users"></v-select>
                </div>
              </div>
               <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Approver:
                </div>
                <div class="col-md-8">
                   <v-select
                      v-model="org.step1_approver"
                      :options="users"></v-select>
                </div>
              </div>
              <div class="row form-group ">
                <div class="col-md-12 text-center">
                  <button class="btn btn-primary" @click="save">Save</button>
                  <button class="btn btn-danger" @click="$router.go(-1)">Close</button>
                </div>
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
  created () {
    if (this.$route.params.id !== undefined) {
      this.$store.dispatch('organization/searchOrgById', this.$route.params.id)
      this.$store.dispatch('user/searchUser')
    } else {
      this.$router.go(-1)
    }
  },
  data () {
    return {
      isActive: '',
      orgCode: ['BHQ', 'GLS001', 'GLS002', 'GLS003'],
      orgCodeSelected: '',
      creatorSelected: ''
    }
  },
  methods: {
    save () {
      this.$store.dispatch('organization/saveOrg', this.org)
    }
  },
  computed: {
    ...mapFields(`organization`, [
      'org'
    ]),
    ...mapFields(`user`, [
      'users'
    ])
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
