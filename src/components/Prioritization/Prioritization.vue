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
                v-model="orgSelectedType"
                :options="orgType"></v-select>
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Organization Code </label>
              <v-select
                @input="selectOrgCode"
                v-model="orgSelectedCode"
                :options="orgCode"></v-select>
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Organization Name </label>
              <v-select
                @input="selectOrgName"
                v-model="orgSelectedName"
                :options="orgName"></v-select>
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
              <button class="btn btn-danger" @click="clear">Clear</button>
            </div>
          </div>
        </div>
        <app-criteria
          org:="orgSelected"
          v-if="isSearch">
        </app-criteria>
      </div>
    </div>
  </div>
</template>

<script>
import Criteria from './Criteria.vue'
import { mapGetters, mapState, mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  components: {
    appCriteria: Criteria
  },
  data () {
    return {
      orgType: ['Division', 'Department'],
      year: ['2017', '2018', '2019', '2020'],
      isSearch: false
    }
  },
  methods: {
    ...mapActions(`prioritization`, [
      'searchPrioritization'
    ]),
    ...mapGetters(`organization`, {
      getRisk: 'getRisk',
      filterByOrgName: 'filterByOrgName',
      filterByOrgCode: 'filterByOrgCode'
    }),
    clear () {
    },
    search () {
      let payload = {
        org_id: this.orgSelected.id,
        year: this.yearSelected
      }
      this.searchPrioritization(payload)
        .then(() => {
          this.isSearch = true
        })
    },
    selectOrgType () {
      if (this.orgTypeSelected !== '' && this.orgTypeSelected !== null) {
        this.$store.dispatch('organization/searchOrg', this.orgTypeSelected)
      }
    },
    selectOrgName () {
      this.filterByOrgName()
    },
    selectOrgCode () {
      this.filterByOrgCode()
    }
  },
  computed: {
    ...mapFields(`organization`, [
      'orgSelectedName',
      'orgSelectedCode',
      'orgSelectedType',
      'yearSelected',
      'orgSelected'
    ]),
    ...mapState({
      orgCode: state => state.organization.codes,
      orgName: state => state.organization.names
    })
  },
  created () {
    this.$store.dispatch('prioritization/getCriteria')
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
