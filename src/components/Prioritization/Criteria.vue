<template>
  <div class="prioritize-table">
    <table class="table table-bordered table-bg table-sm text-center">
      <thead class="table-head">
        <th>รหัส</th>
        <th>ชื่อตัวขี้วัด</th>
        <!-- <th>QPS Type</th> -->
        <th>Indicator Type</th>
        <th style="width:100px;" v-for="item in criteria" :key="item.id">{{ item.name }}</th>
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
          <td style="background-color: antiquewhite;" v-for="item in criteria" :key="item.id">{{ item.weight }}</td>
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
          <td style="background-color: aliceblue; text-align: left;" v-for="item in criteria" :key="item.id">
            <div v-for="scale in item.criteriaScales" :key="scale.id" v-tooltip:left="scale.value + ' ' + scale.description">{{ scale.value }} {{ scale.description | wordWrap }}</div>
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
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('prioritization/getCriteria')
  },
  computed: {
    ...mapFields('prioritization', ['criteria', 'count'])
  },
  filters: {
    wordWrap (value) {
      return value.split(' ')[0] + '..'
    }
  }
}
</script>

<style lang="scss" scoped>
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
