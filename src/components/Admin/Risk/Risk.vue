<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Risk</div>
        <div class="text-right">
          <router-link to="/risk_form" tag="button" class="btn btn-primary" v-if="isAdmin()">Add Risk</router-link>
        </div>
        <div class="container">
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Risk Group: </label>
              <v-select v-model="risk.risk_group" :options="risk_group"></v-select>
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Risk Type: </label>
              <v-select v-model="risk.risk_type" :options="risk_type"></v-select>
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Problem Area or Activity: </label>
              <input type="text" class="form-control" v-model="risk.problem_area" />
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Identified: </label>
              <input type="text" class="form-control" v-model="risk.identified" />
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-6 text-right">
              <button class="btn btn-info" @click="search">Search</button>
            </div>
            <div class="col-md-6">
              <button class="btn btn-danger" @click="clear()">Clear</button>
            </div>
          </div>
        </div>
        <table class="table table-bg" v-show="isSearch">
          <thead class="table-head">
            <th class="risk-type">Risk Type</th>
            <th class="risk-group">Risk Group</th>
            <th>Problem Area or Activity</th>
            <th>Indentified</th>
            <th class="desc">Description</th>
            <th >Existing Measures</th>
            <!-- <th >Status</th> -->
          </thead>
          <tbody>
            <router-link v-for="risk in risks" :key="risk.id" :to="{path: `/risk_form/${risk.id}`}" tag="tr">
              <td>{{ risk.risk_type }}</td>
              <td>{{ risk.risk_group }}</td>
              <td>{{ risk.problem_area }}</td>
              <td>{{ risk.identified }}</td>
              <td>{{ risk.description }}</td>
              <td><div v-for="existing in risk.existing_risk" :key="existing.id">- {{ existing.indicator.name }}</div></td>
              <!-- <td :class="{'text-success': parseInt(risk.is_active) === 1, 'text-danger': parseInt(risk.is_active) === 0}">{{ parseInt(risk.is_active) === 1 ? 'Active' : 'Inactive' }}</td> -->
            </router-link>
            <tr v-show="!risks.length">
              <td class="text-center" colspan="6">No Data</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  data () {
    return {
      risk_type: ['General Risk', 'Clinical Risk', 'Sepcific Risk'],
      risk_group: ['OPD', 'IPD', 'Critical Care', 'Back Office', 'Medical Support'],
      risk: {
        risk_group: '',
        risk_type: '',
        identified: '',
        problem_area: '',
        is_master: true
      },
      isSearch: false,
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    search () {
      const payload = {
        risk: this.risk,
        riskIds: null
      }
      this.isSearch = true
      this.$store.dispatch('riskMaster/searchRisk', payload)
        .then(() => {
          this.search = true
        })
    },
    clear () {
      this.isSearch = false
      this.risk = {
        risk_group: '',
        risk_type: '',
        identified: '',
        problem_area: '',
        is_master: true
      }
    },
    isAdmin () {
      return parseInt(this.user.is_admin)
    }
  },
  computed: {
    ...mapFields('riskMaster', ['risks'])
  }
}
</script>

<style lang="scss" scoped>
  .table {
    font-size: 0.85rem;
    tr {
      cursor: pointer;
    }
    .desc {
      width: 40%;
    }
    .risk-type,
    .risk-group {
      width: 8%;
    }
  }
</style>
