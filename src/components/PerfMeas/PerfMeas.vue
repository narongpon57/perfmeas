<template>
  <div class="perfmeas-table">
    <table class="table table-bordered table-bg table-sm text-center">
      <thead class="table-head">
        <th></th>
        <th>รหัส</th>
        <th>ชื่อตัวขี้วัด</th>
        <th>ตัวตั้ง (a) / ตัวหาร (b)</th>
        <th>สูตรการคำนวณ</th>
        <th>เครื่องหมาย</th>
        <th>เป้าหมาย</th>
        <th style="width:4%;">ม.ค.</th>
        <th style="width:4%;">ก.พ.</th>
        <th style="width:4%;">มี.ค.</th>
        <th style="width:4%;">เม.ย.</th>
        <th style="width:4%;">พ.ค.</th>
        <th style="width:4%;">มิ.ย.</th>
        <th style="width:4%;">ก.ค.</th>
        <th style="width:4%;">ส.ค.</th>
        <th style="width:4%;">ก.ย.</th>
        <th style="width:4%;">ต.ค.</th>
        <th style="width:4%;">พ.ย.</th>
        <th style="width:4%;">ธ.ค.</th>
        <th>YTD</th>
      </thead>
      <tbody>
        <template v-for="(item, index) in performanceMeasurement">
          <tr :key="item.id">
            <td rowspan="2"><font-awesome-icon
                icon="times"
                class="remove-icon"
                @click="remove(index)"
                v-if="index !== 0 && item.summary_result === null"/>
            </td>
            <td rowspan="2">{{ item.code }}</td>
            <td rowspan="2">{{ item.name }}</td>
            <td>{{ item.multiplier }}</td>
            <td rowspan="2">{{ item.formular }}</td>
            <td rowspan="2">{{ item.operator }}</td>
            <td rowspan="2">{{ item.target }}</td>
            <td><input type="text" v-model="item.jan_multiplier_value"></td>
            <td><input type="text" v-model="item.feb_multiplier_value"></td>
            <td><input type="text" v-model="item.mar_multiplier_value"></td>
            <td><input type="text" v-model="item.apr_multiplier_value"></td>
            <td><input type="text" v-model="item.may_multiplier_value"></td>
            <td><input type="text" v-model="item.jun_multiplier_value"></td>
            <td><input type="text" v-model="item.jul_multiplier_value"></td>
            <td><input type="text" v-model="item.aug_multiplier_value"></td>
            <td><input type="text" v-model="item.sep_multiplier_value"></td>
            <td><input type="text" v-model="item.oct_multiplier_value"></td>
            <td><input type="text" v-model="item.nov_multiplier_value"></td>
            <td><input type="text" v-model="item.dec_multiplier_value"></td>
            <td>{{ ytdMultiplier(item) }}</td>
          </tr>
          <tr :key="item.risk_assessment_indicator_id">
            <td>{{ item.divisor }}</td>
            <td><input type="text" v-model="item.jan_divisor_value"></td>
            <td><input type="text" v-model="item.feb_divisor_value"></td>
            <td><input type="text" v-model="item.mar_divisor_value"></td>
            <td><input type="text" v-model="item.apr_divisor_value"></td>
            <td><input type="text" v-model="item.may_divisor_value"></td>
            <td><input type="text" v-model="item.jun_divisor_value"></td>
            <td><input type="text" v-model="item.jul_divisor_value"></td>
            <td><input type="text" v-model="item.aug_divisor_value"></td>
            <td><input type="text" v-model="item.sep_divisor_value"></td>
            <td><input type="text" v-model="item.oct_divisor_value"></td>
            <td><input type="text" v-model="item.nov_divisor_value"></td>
            <td><input type="text" v-model="item.dec_divisor_value"></td>
            <td>{{ ydtDivisor(item) }}</td>
          </tr>
          <tr :key="item.code" style="background-color: antiquewhite;">
            <td colspan="7"></td>
            <td :class="checkTarget(item.jan_multiplier_value, item.jan_divisor_value, item.unit, item.operator, parseInt(item.target))">{{ calPerfMonth(item.jan_multiplier_value, item.jan_divisor_value, item.unit) }}</td>
            <td :class="checkTarget(item.feb_multiplier_value, item.feb_divisor_value, item.unit, item.operator, parseInt(item.target))">{{ calPerfMonth(item.feb_multiplier_value, item.feb_divisor_value, item.unit) }}</td>
            <td :class="checkTarget(item.mar_multiplier_value, item.mar_divisor_value, item.unit, item.operator, parseInt(item.target))">{{ calPerfMonth(item.mar_multiplier_value, item.mar_divisor_value, item.unit) }}</td>
            <td :class="checkTarget(item.apr_multiplier_value, item.apr_divisor_value, item.unit, item.operator, parseInt(item.target))">{{ calPerfMonth(item.apr_multiplier_value, item.apr_divisor_value, item.unit) }}</td>
            <td :class="checkTarget(item.may_multiplier_value, item.may_divisor_value, item.unit, item.operator, parseInt(item.target))">{{ calPerfMonth(item.may_multiplier_value, item.may_divisor_value, item.unit) }}</td>
            <td :class="checkTarget(item.jun_multiplier_value, item.jun_divisor_value, item.unit, item.operator, parseInt(item.target))">{{ calPerfMonth(item.jun_multiplier_value, item.jun_divisor_value, item.unit) }}</td>
            <td :class="checkTarget(item.jul_multiplier_value, item.jul_divisor_value, item.unit, item.operator, parseInt(item.target))">{{ calPerfMonth(item.jul_multiplier_value, item.jul_divisor_value, item.unit) }}</td>
            <td :class="checkTarget(item.aug_multiplier_value, item.aug_divisor_value, item.unit, item.operator, parseInt(item.target))">{{ calPerfMonth(item.aug_multiplier_value, item.aug_divisor_value, item.unit) }}</td>
            <td :class="checkTarget(item.sep_multiplier_value, item.sep_divisor_value, item.unit, item.operator, parseInt(item.target))">{{ calPerfMonth(item.sep_multiplier_value, item.sep_divisor_value, item.unit) }}</td>
            <td :class="checkTarget(item.oct_multiplier_value, item.oct_divisor_value, item.unit, item.operator, parseInt(item.target))">{{ calPerfMonth(item.oct_multiplier_value, item.oct_divisor_value, item.unit) }}</td>
            <td :class="checkTarget(item.nov_multiplier_value, item.nov_divisor_value, item.unit, item.operator, parseInt(item.target))">{{ calPerfMonth(item.nov_multiplier_value, item.nov_divisor_value, item.unit) }}</td>
            <td :class="checkTarget(item.dec_multiplier_value, item.dec_divisor_value, item.unit, item.operator, parseInt(item.target))">{{ calPerfMonth(item.dec_multiplier_value, item.dec_divisor_value, item.unit) }}</td>
            <td :class="checkTargetSummary(item, item.unit, item.operator, item.target)">{{ ytdSummary(item, item.unit, index) }}</td>
          </tr>
        </template>
        <tr v-if="!performanceMeasurement.length">
          <td colspan="20">No Data</td>
        </tr>
      </tbody>
    </table>
     <div v-if="performanceMeasurement.length">
      <div class="col-md-12 form-group">
        <button class="btn btn-info" @click="showModal">Add Indicator</button>
      </div>
      <div class="col-md-12 form-group text-center">
        <button class="btn btn-primary" @click="save">Save</button>
        <button class="btn btn-danger">Close</button>
      </div>
    </div>
    <app-ind-perf-modal
      v-show="isModalVisible"
      @close="closeModal"
      :assessmentId="getAssessmentId"
      :riskIndicatorId="getRiskIndicatorId"
    />
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import IndicatorPerformanceModal from '../IndicatorPerformanceModal.vue'

export default {
  props: {
    org: Object
  },
  components: {
    appIndPerfModal: IndicatorPerformanceModal
  },
  data () {
    return {
      isModalVisible: false
    }
  },
  methods: {
    ...mapActions('performanceMeasurement', [
      'savePerformanceMeasurement'
    ]),
    showModal () {
      this.$store.dispatch('performanceMeasurement/searchPerformanceIndicator', {
        assessmentId: this.getAssessmentId,
        riskIndicatorId: this.getRiskIndicatorId
      })
        .then(() => {
          this.isModalVisible = true
        })
    },
    closeModal () {
      this.isModalVisible = false
    },
    remove (index) {
      let r = confirm('Do you want to delete this item ?')
      if (r) {
        this.$store.commit('performanceMeasurement/REMOVE_PERFORMANCE_MEASUREMENT', index)
      }
    },
    save () {
      this.savePerformanceMeasurement(this.performanceMeasurement)
    },
    calPerfMonth (multiplier, divisor, unit) {
      return isNaN((multiplier / divisor) * unit) ? 'N/A' : ((multiplier / divisor) * unit).toFixed(2)
    },
    ytdMultiplier (perf) {
      return (Number(perf.jan_multiplier_value) + Number(perf.feb_multiplier_value) + Number(perf.mar_multiplier_value) + Number(perf.apr_multiplier_value) + Number(perf.may_multiplier_value) + Number(perf.jun_multiplier_value) + Number(perf.jul_multiplier_value) + Number(perf.aug_multiplier_value) + Number(perf.sep_multiplier_value) + Number(perf.oct_multiplier_value) + Number(perf.nov_multiplier_value) + Number(perf.dec_multiplier_value)).toFixed(2)
    },
    ydtDivisor (perf) {
      return (Number(perf.jan_divisor_value) + Number(perf.feb_divisor_value) + Number(perf.mar_divisor_value) + Number(perf.apr_divisor_value) + Number(perf.may_divisor_value) + Number(perf.jun_divisor_value) + Number(perf.jul_divisor_value) + Number(perf.aug_divisor_value) + Number(perf.sep_divisor_value) + Number(perf.oct_divisor_value) + Number(perf.nov_divisor_value) + Number(perf.dec_divisor_value)).toFixed(2)
    },
    ytdSummary (perf, unit, index) {
      const result = {
        ytd: isNaN((this.ytdMultiplier(perf) / this.ydtDivisor(perf)) * unit) ? null : ((this.ytdMultiplier(perf) / this.ydtDivisor(perf)) * unit).toFixed(2),
        index: index
      }
      this.$store.commit('performanceMeasurement/SET_SUMMARY_RESULT', result)
      return isNaN((this.ytdMultiplier(perf) / this.ydtDivisor(perf)) * unit) ? 'N/A' : ((this.ytdMultiplier(perf) / this.ydtDivisor(perf)) * unit).toFixed(2)
    },
    checkTarget (multiplier, divisor, unit, operator, target) {
      let activeClass = ''
      if (!isNaN((multiplier / divisor) * unit)) {
        let ytdMonth = (multiplier / divisor) * unit
        let onTarget = ''
        switch (operator) {
          case '=':
            onTarget = ytdMonth === target
            break
          case '>':
            onTarget = ytdMonth > target
            break
          case '<':
            onTarget = ytdMonth < target
            break
          case '>=':
            onTarget = ytdMonth >= target
            break
          case '<=':
            onTarget = ytdMonth >= target
            break
          case '!=':
            onTarget = ytdMonth !== target
            break
          default:
            onTarget = ''
        }
        activeClass = onTarget ? 'target' : 'no-target'
      }
      return activeClass
    },
    checkTargetSummary (perf, unit, operator, target) {
      let activeClass = ''
      let ytdMonth = (this.ytdMultiplier(perf) / this.ydtDivisor(perf)) * unit
      if (!isNaN(ytdMonth)) {
        let onTarget = ''
        switch (operator) {
          case '=':
            onTarget = ytdMonth === target
            break
          case '>':
            onTarget = ytdMonth > target
            break
          case '<':
            onTarget = ytdMonth < target
            break
          case '>=':
            onTarget = ytdMonth >= target
            break
          case '<=':
            onTarget = ytdMonth >= target
            break
          case '!=':
            onTarget = ytdMonth !== target
            break
          default:
            onTarget = ''
        }
        activeClass = onTarget ? 'target' : 'no-target'
      }
      return activeClass
    }
  },
  computed: {
    ...mapFields('performanceMeasurement', [
      'performanceMeasurement'
    ]),
    getRiskIndicatorId () {
      return this.performanceMeasurement.map(obj => {
        return obj.risk_assessment_indicator_id
      })
    },
    getAssessmentId () {
      if (this.performanceMeasurement.length) {
        return this.performanceMeasurement[0].assessment_id
      }
      return null
    }
  },
  filters: {
    fixDecimal (value) {
      return value.toFixed()
    }
  }
}
</script>

<style lang="scss" scoped>
.perfmeas-table {
  table {
    font-size: 12px;
    tr {
      td {
        input {
          width: 100%;
          // height: 30px;
          text-align: center;
        }
        i {
          cursor: pointer;
        }
      }
    }
  }
}
.target {
  background-color: green;
  color: white;
  font-weight: bold;
}
.no-target {
  background-color: red;
  color: white;
  font-weight: bold;
}
.btn-primary {
  margin: 0 10px;
}
</style>
