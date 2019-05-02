<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Risk Assessment</div>
        <div class="row risk-search">
          <div class="col-md-4">
            <div class="form-group">
              <label for="" class="font-normal">Organization Type</label>
              <v-select
                @input="selectOrgType"
                :value="typeSelected"
                :options="orgType"></v-select>
            </div>
            <div class="form-group">
              <label for="" class="font-normal">Organization Code</label>
              <v-select
                v-model="orgSelected"
                label="code"
                :options="orgUnits"></v-select>
            </div>
            <div class="form-group">
              <label for="" class="font-normal">Organization Name</label>
              <v-select
                v-model="orgSelected"
                label="name"
                :options="orgUnits"></v-select>
            </div>
            <div class="form-group">
              <label for="" class="font-normal">Data of Year</label>
              <v-select v-model="yearSelected" :options="year"></v-select>
            </div>
            <div class="form-group text-center">
              <button
                class="btn btn-info"
                v-if="orgSelected && yearSelected"
                @click="search">Search</button>
            </div>
          </div>
          <div class="col-md-8">
            <fieldset class="rating-criteria">
              <legend class="topic">Rating Criteria</legend>
              <div class="row">
                <div class="col-md-5 col-padding col-left">
                  <table class="rating">
                    <thead>
                      <tr>
                        <th>Probability Score: <br> (frequency, time frame frequency, probability)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>1 Rare (never recur, not occur for yr., &lt; 0.1%)</td></tr>
                      <tr><td>2 Unlikely (possible to occur, occur 1/yr., 0.1-1%)</td></tr>
                      <tr><td>3 Possible (occur occasionally, occur 1/mo., 1-10%)</td></tr>
                      <tr><td>4 Likely (probably happen, 1/wk., 10-50%)</td></tr>
                      <tr><td>5 Almost certain (possibly frequently, occur daily or more, &gt; 50%)</td></tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-md-2 col-padding">
                  <table class="rating">
                    <thead>
                      <tr>
                        <th>Impact Score:</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>1 Negligible</td></tr>
                      <tr><td>2 Minor</td></tr>
                      <tr><td>3 Moderate</td></tr>
                      <tr><td>4 Major</td></tr>
                      <tr><td>5 Catastrophic</td></tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-md-5 col-padding col-right">
                  <table class="rating">
                    <thead>
                      <tr>
                        <th>Risk Score:</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td><span class="dot low"></span> 1-3 Low (Acceptable level)</td></tr>
                      <tr><td><span class="dot mod"></span> 4-6 Moderate (Risk reduction with in 1 yr)</td></tr>
                      <tr><td><span class="dot high"></span> 8-12 High (Conduct risk reduction within 6 mo.)</td></tr>
                      <tr><td><span class="dot extreme"></span> 15-25 Extreme (Conduct risk reduction immediately)</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="row risk-table" v-if="isSearch">
          <app-risk
            :org="orgProp"
            :year="yearProp">
          </app-risk>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Risk from './Risk.vue'
import { mapFields } from 'vuex-map-fields'

export default {
  components: {
    appRisk: Risk
  },
  data () {
    return {
      year: ['2017', '2018', '2019', '2020'],
      isSearch: false,
      risks: []
    }
  },
  created () {
    const org = JSON.parse(localStorage.getItem('org'))
    const year = localStorage.getItem('year')
    if (org !== null && year !== null) {
      this.$store.dispatch('riskAssessment/searchRiskAssessment', { org, year })
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
    ...mapActions('riskAssessment', [
      'searchRiskAssessment'
    ]),
    ...mapActions('organization', [
      'searchOrg'
    ]),
    search () {
      let payload = {
        org: this.orgSelected,
        year: this.yearSelected
      }
      this.searchRiskAssessment(payload)
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
  }
}
</script>

<style lang="scss" scoped>
  .risk-table {
    margin-top: 20px;
  }
  .col-padding {
    padding: 0 5px !important;
  }
  .col-left {
    padding-left: 15px !important;
  }
  .col-right {
    padding-right: 15px !important;
  }
  .form-group {
    margin-bottom: .5rem;
    label {
      margin-bottom: 0;
    }
  }

  .rating-criteria {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px;
    position: relative;
    border-radius: 10px;
    background-color: rgba(256,256,256,0.7);
    legend {
      width: auto;
      padding: 0 10px;
    }
    .rating {
      font-size: 12px;
      font-weight: bold;
      border: 1px solid #2e9ad0;
      border-radius: 5px;
      height: 240px;
      width: 100%;
      th {
        font-size: 14px;
        padding: 0 5px;
        height: 70px;
        color: #fff;
        background-color: #2e9ad0;
      }
      tbody {
        height: 150px;
        tr {
          td {
            padding: 0 5px;
          }
        }
      }
    }
  }

  .dot {
    margin-right: 5px;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    display: inline-block;
  }
  .low {
    background-color: green;
  }
  .mod {
    background-color: yellow;
  }
  .high {
    background-color: orange;
  }
  .extreme {
    background-color: red;
  }
</style>
