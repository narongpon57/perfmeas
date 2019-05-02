<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Prioritization</div>
         <div class="container">
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Organization Type </label>
              <v-select
                @input="selectOrgType"
                :value="typeSelected"
                :options="orgType"></v-select>
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Organization Code </label>
              <v-select
                v-model="orgSelected"
                label="code"
                :options="orgUnits"></v-select>
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Organization Name </label>
              <v-select
                v-model="orgSelected"
                label="name"
                :options="orgUnits"></v-select>
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Data of Year </label>
              <v-select v-model="yearSelected" :options="year"></v-select>
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
        <app-criteria
          :org="orgProp"
          :year="yearProp"
          v-if="isSearch">
        </app-criteria>
      </div>
    </div>
  </div>
</template>

<script>
import Criteria from './Criteria.vue'
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  components: {
    appCriteria: Criteria
  },
  data () {
    return {
      year: ['2017', '2018', '2019', '2020'],
      isSearch: false
    }
  },
  created () {
    this.$store.dispatch('prioritization/getCriteria')
    const org = JSON.parse(localStorage.getItem('org'))
    const year = localStorage.getItem('year')
    if (org !== null && year !== null) {
      this.$store.dispatch('prioritization/searchPrioritization', { org, year })
        .then(() => {
          this.isSearch = true
          this.$store.commit('organization/SET_ORG_SELECTED', {
            org: org,
            year: year,
            type: org.type
          })
        })
    }
  },
  methods: {
    ...mapActions(`prioritization`, [
      'searchPrioritization'
    ]),
    ...mapActions('organization', [
      'searchOrg'
    ]),
    search () {
      let payload = {
        org: this.orgSelected,
        year: this.yearSelected
      }
      this.searchPrioritization(payload)
        .then(() => {
          localStorage.setItem('year', this.yearSelected)
          localStorage.setItem('org', JSON.stringify(this.orgSelected))
          this.isSearch = true
        })
    },
    selectOrgType (type) {
      this.searchOrg(type)
    }
  },
  computed: {
    ...mapFields(`organization`, [
      'typeSelected',
      'yearSelected',
      'orgSelected',
      'orgUnits',
      'orgType'
    ]),
    orgProp () {
      return this.orgSelected || JSON.parse(localStorage.getItem('org'))
    },
    yearProp () {
      return this.yearSelected || localStorage.getItem('year')
    }
  },
  filters: {
    wordWrap (value) {
      return value.split(' ')[0] + '..'
    }
  }
}
</script>

<style lang="scss" scoped>
.form-group {
  button {
    margin: 0 5px;
  }
}
</style>
