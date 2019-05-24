<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Indicator</div>
        <div class="text-right">
          <router-link to="/indicator_form" tag="button" class="btn btn-primary" v-if="isAdmin()">Add Indicator</router-link>
        </div>
        <div class="container">
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Indicator Code: </label>
              <input type="text" class="form-control" v-model="indicator.code" />
            </div>
             <div class="col-md-6">
              <label for="" class="font-normal">Indicator Name: </label>
              <input type="text" class="form-control" v-model="indicator.name" />
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Indicator Type: </label>
              <v-select v-model="indicator.indicator_type" :options="indicator_type"></v-select>
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Frequency: </label>
              <v-select v-model="indicator.frequency" :options="frequency"></v-select>
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Measurement Domain: </label>
              <v-select v-model="indicator.measurement_domain" :options="measurement_domain"></v-select>
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Standard: </label>
              <v-select v-model="indicator.standard" :options="standard"></v-select>
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
            <th>Code</th>
            <th>Name</th>
            <th>Multiplier (a)</th>
            <th>Divisor (b)</th>
            <th>Formulat</th>
            <th>Operator</th>
            <th>Target</th>
            <th>Frequency</th>
          </thead>
          <tbody>
            <router-link v-for="indicator in indicators" :key="indicator.id" :to="{path: `/indicator_form/${indicator.id}`}" tag="tr">
              <td>{{ indicator.code }}</td>
              <td>{{ indicator.name }}</td>
              <td>{{ indicator.multiplier }}</td>
              <td>{{ indicator.divisor }}</td>
              <td>{{ indicator.formular }}</td>
              <td>{{ indicator.operator }}</td>
              <td>{{ indicator.target }}</td>
              <td>{{ indicator.frequency }}</td>
            </router-link>
            <tr v-show="!indicators.length">
              <td class="text-center" colspan="8">No Data</td>
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
      indicator_type: ['Process', 'Access', 'Outcome', 'Process and Outcome'],
      measurement_domain: ['Clinical Quality Measures', 'Non Clinical Quality Measures', 'Population Health Quality Measures', 'Related Health Care Delivery Measures', 'Related Population Health Measures'],
      standard: ['Disease-Specific Care Programs', 'Facility Management and Safety', 'Hospital Management', 'Patient Care Process', 'Work Process'],
      frequency: ['Monthly', 'Quarterly', 'Half-yearly', 'Yearly'],
      indicator: {
        code: '',
        name: '',
        frequency: '',
        indicator_type: '',
        measurement_domain: '',
        standard: '',
        is_master: true
      },
      isSearch: false,
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    search () {
      const payload = {
        indicator: this.indicator,
        indicatorIds: null
      }
      this.$store.dispatch('indicatorMaster/searchIndicator', payload)
        .then(() => {
          this.isSearch = true
        })
    },
    isAdmin () {
      return parseInt(this.user.is_admin)
    },
    clear () {
      this.isSearch = false
      this.indicator = {
        code: '',
        name: '',
        frequency: '',
        indicator_type: '',
        measurement_domain: '',
        standard: '',
        is_master: true
      }
    }
  },
  computed: {
    ...mapFields('indicatorMaster', ['indicators'])
  }
}
</script>

<style lang="scss" scoped>
  table {
    font-size: 0.85rem;
    tr {
      cursor: pointer;
    }
    .desc {
      width: 55%;
    }
    .risk-type,
    .risk-group {
      width: 8%;
    }
  }
</style>
