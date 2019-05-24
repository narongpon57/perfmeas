<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Report</div>
        <div class="container">
          <div class="row">
            <div class="col-md-10 offset-md-1">
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Report Type:
                </div>
                <div class="col-md-9">
                  <select class="form-control form-group form-control-sm" v-model="typeSelected" @change="typeChage()">
                    <option v-for="i in type" :key="i">{{ i }}</option>
                  </select>
                </div>
              </div>
              <div class="row gorm-group" v-if="typeSelected === 'Top Prioritization Score'">
                <div class="col-md-3 text-right label-text">
                  Year:
                </div>
                <div class="col-md-6">
                  <select class="form-control form-group form-control-sm" v-model="yearSelected">
                    <option v-for="i in year" :key="i">{{ i }}</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <button
                    class="btn btn-primary"
                    @click="showPrioritizeSummary()">Show Report
                  </button>
                </div>
              </div>
              <div class="row gorm-group" v-if="typeSelected === 'Working Process'">
                <div class="col-md-3 text-right label-text">
                  Year:
                </div>
                <div class="col-md-6">
                  <select class="form-control form-group form-control-sm" v-model="yearSelected">
                    <option v-for="i in year" :key="i">{{ i }}</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <button
                    class="btn btn-primary"
                    @click="showWorkingProcess()">Show Report
                  </button>
                </div>
              </div>
            </div>
          </div>
          <bar-chart
            v-if="barChartLoaded"
            :chartData="barChartData"
            :indicatorData="scoreSummary"
            @on-receive="exportIndicator"/>
          <div class="container">
            <div class="row">
              <div class="col-md-8 offset-md-2">
                <pie-chart
                  v-if="pieChartLoaded"
                  :chartData="pieChartData"
                  @on-receive="showWorkingProcessModal"/>
              </div>
            </div>
          </div>
          <working-process-modal
            v-show="isModalVisible"
            @close="closeModal"
            :organizationUnit="ouData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
import BarChart from './BarChart.vue'
import PieChart from './PieChart.vue'
import WorkingProcessModal from '@/components/WorkingProcessModal.vue'
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import { saveAs } from 'file-saver'

export default {
  components: { BarChart, PieChart, WorkingProcessModal },
  data () {
    return {
      type: ['Top Priority Score', 'Working Process'],
      typeSelected: null,
      barChartLoaded: false,
      pieChartLoaded: false,
      barChartData: null,
      pieChartData: null,
      options: null,
      year: [2018, 2019, 2020],
      yearSelected: null,
      indicatorSelected: null,
      isModalVisible: false,
      ouData: null
    }
  },
  methods: {
    ...mapActions('summary', ['getTop5Score', 'getWorkingProcess']),
    showPrioritizeSummary () {
      this.getTop5Score({ year: this.yearSelected })
        .then(() => {
          const result = this.scoreSummary
          const labels = result.map(obj => {
            return obj.code
          })
          const dataset = result.map(obj => {
            return obj.total
          })
          this.barChartData = {
            labels: labels,
            datasets: [{
              backgroundColor: '#f87979',
              data: dataset,
              label: `Toltal Priority Score`
            }]
          }
          this.barChartLoaded = true
        })
    },
    showWorkingProcess () {
      this.getWorkingProcess({ year: this.yearSelected })
        .then(() => {
          this.pieChartData = {
            labels: ['Risk Assessment', 'Prioritization', 'Performance Measurement', 'Not start'],
            datasets: [
              {
                label: 'Working Process',
                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#333333'],
                data: [this.ouRiskAssessment.length, this.ouPrioritization.length, this.ouPerfmeas.length, this.ouNotInProcess.length]
              }
            ]
          }
          this.pieChartLoaded = true
        })
    },
    closeModal () {
      this.isModalVisible = false
    },
    typeChage () {
      this.barChartLoaded = false
      this.pieChartLoaded = false
      this.barChartData = null
      this.pieChartData = null
    },
    showWorkingProcessModal (data) {
      if (data._index === 0) this.ouData = this.ouRiskAssessment
      else if (data._index === 1) this.ouData = this.ouPrioritization
      else if (data._index === 2) this.ouData = this.ouPerfmeas
      else if (data._index === 3) this.ouData = this.ouNotInProcess
      this.isModalVisible = true
    },
    exportIndicator (data) {
      if (data !== undefined) {
        this.indicatorSelected = this.scoreSummary[data._index]
        this.$store.dispatch('exportExcel/exportIndicator', {
          indicator_id: this.indicatorSelected.id,
          year: this.yearSelected
        })
          .then(result => {
            const date = new Date()
            saveAs(new Blob([this.s2ab(atob(result))], { type: 'application/octet-stream' }), `${this.indicatorSelected.code}_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.xlsx`)
          })
      }
    },
    exportExcel () {
      this.$store.dispatch('exportExcel/exportIndicator', {
        year: this.yearSelected
      })
        .then(result => {
          const date = new Date()
          saveAs(new Blob([this.s2ab(atob(result))], { type: 'application/octet-stream' }), `SummaryIndicator_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.xlsx`)
        })
    },
    s2ab (s) {
      let buf = new ArrayBuffer(s.length)
      let view = new Uint8Array(buf)
      for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF
      }
      return buf
    }
  },
  computed: {
    ...mapFields('summary', [
      'scoreSummary',
      'ouRiskAssessment',
      'ouPrioritization',
      'ouPerfmeas',
      'ouNotInProcess'
    ])
  }
}
</script>

<style lang="scss" scoped>

</style>
