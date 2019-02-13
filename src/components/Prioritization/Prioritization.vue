<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Prioritization</div>
         <div class="container">
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Organization Type </label>
              <v-select v-model="orgTypeSelected" :options="orgType"></v-select>
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Organization Code </label>
              <v-select v-model="orgCodeSelected" :options="orgCode"></v-select>
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Organization Name </label>
              <v-select v-model="orgNameSelected" :options="orgName"></v-select>
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Data of Year </label>
              <v-select v-model="yearSelected" :options="year"></v-select>
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-6 text-right">
              <button class="btn btn-info">Search</button>
            </div>
            <div class="col-md-6">
              <button class="btn btn-danger" @click="clear">Clear</button>
            </div>
          </div>
        </div>
        <div class="prioritize-table">
          <table class="table table-bordered table-bg table-sm text-center">
            <thead class="table-head">
              <th>รหัส</th>
              <th>ชื่อตัวขี้วัด</th>
              <!-- <th>QPS Type</th> -->
              <th>Indicator Type</th>
              <th style="width:100px;" v-for="item in criteria" :key="item.name">{{ item.name }}</th>
              <th>Priority score</th>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <!-- <td></td> -->
                <td></td>
                <td colspan="9" style="background-color: antiquewhite;">น้ำหนัก</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <!-- <td></td> -->
                <td></td>
                <td style="background-color: antiquewhite;" v-for="item in criteria" :key="item.name">{{ item.weight }}</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <!-- <td></td> -->
                <td></td>
                <td colspan="9" style="background-color: aliceblue;">Scale</td>
                <td></td>
              </tr>
                <tr>
                <td></td>
                <td></td>
                <!-- <td></td> -->
                <td></td>
                <td style="background-color: aliceblue; text-align: left;" v-for="item in criteria" :key="item.name">
                  <div v-for="scale in item.scale" :key="scale.label" v-tooltip:left="scale.val + ' ' + scale.label">{{ scale.val }} {{ scale.label | wordWrap }}</div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>BHQ10283685</td>
                <td>% ความพึงพอใจมาก ความรวดเร็วในการให้ข้อมูล</td>
                <!-- <td>Managerial</td> -->
                <td>Outcome</td>
                <td v-for="number in count" :key="number"><input type="text" value="0"></td>
                <td>95</td>
              </tr>
              <tr>
                <td>BHQ10283685</td>
                <td>% ความพึงพอใจมาก ความรวดเร็วในการให้ข้อมูล</td>
                <!-- <td>Managerial</td> -->
                <td>Outcome</td>
                <td v-for="number in count" :key="number"><input type="text" value="0"></td>
                <td>95</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      orgType: ['Bu', 'Department'],
      orgCode: ['BHQ', 'GLS001', 'GLS002', 'GLS003'],
      orgName: ['BU.Back Office', 'BU.OPD', 'BU.IPD'],
      year: ['2017', '2018', '2019', '2020'],
      orgTypeSelected: '',
      orgCodeSelected: '',
      orgNameSelected: '',
      yearSelected: '',
      isSearch: false,
      count: 0,
      criteria: []
    }
  },
  created () {
    this.count = this.$store.getters.countPrioritizationCriteria
    this.criteria = this.$store.getters.getPrioritizationCriteria
  },
  methods: {
    ...mapGetters({
      getPrioritizationCriteria: 'getPrioritizationCriteria'
    }),
    clear () {
      this.orgTypeSelected = ''
      this.orgCodeSelected = ''
      this.orgNameSelected = ''
      this.yearSelected = ''
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
.prioritize-table {
  table {
    font-size: 12px;
    tr {
      td {
        input {
          width: 50%;
          height: 30px;
          text-align: center;
        }
      }
    }
  }
}
</style>
