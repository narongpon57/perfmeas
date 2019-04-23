<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Period Management</div>
        <div class="text-right">
          <router-link to="/period_management_form" tag="button" class="btn btn-primary">Add Period</router-link>
        </div>
        <div class="container">
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Name: </label>
              <input type="text" v-model="period.name" class="form-control">
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Status: </label>
                <select class="form-control " v-model="period.status">
                  <option v-for="s in status" :key="s" :value="s">{{ s }}</option>
                </select>
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Type: </label>
              <select class="form-control " v-model="period.type">
                <option v-for="i in type" :key="i" :value="i">{{ i }}</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Year: </label>
              <select class="form-control " v-model="period.year">
                <option v-for="y in year" :key="y" :value="y">{{ y }}</option>
              </select>
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
        <table class="table table-bg" v-show="isSearch">
          <thead class="table-head">
            <th>Period Type</th>
            <th>Period Name</th>
            <th>Period Year</th>
            <th>Date From</th>
            <th>Date To</th>
            <th>Published Date</th>
            <th>Status</th>
          </thead>
          <tbody>
            <router-link v-for="period in periods" :key="period.id" :to="{path: `/period_management_form/${period.id}`}" tag="tr">
              <td>{{ period.type }}</td>
              <td>{{ period.name }}</td>
              <td>{{ period.year }}</td>
              <td>{{ period.date_from_string }}</td>
              <td>{{ period.date_to_string }}</td>
              <td>{{ period.published_date_string }}</td>
              <td>{{ period.status }}</td>
            </router-link>
            <tr v-show="!periods.length">
              <td class="text-center" colspan="7">No Data</td>
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
      status: ['Draft', 'Published', 'Inactive'],
      type: ['Performance Measurement', 'Risk Assessment', 'Prioritization'],
      year: ['2018', '2019', '2020'],
      period: {
        type: '',
        name: '',
        status: '',
        year: ''
      }
    }
  },
  methods: {
    search () {
      const payload = {
        period: this.period
      }
      this.$store.dispatch('period/searchPeriod', payload)
        .then(() => {
          this.isSearch = true
        })
    }
  },
  computed: {
    ...mapFields('period', ['periods'])
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
