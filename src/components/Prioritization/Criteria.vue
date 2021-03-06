<template>
  <div class="prioritize-table">
    <div class="text-right form-group">
      <button class="btn btn-info" @click="exportExcel()">Export Excel</button>
    </div>
    <table class="table table-bordered table-bg table-sm text-center">
      <thead class="table-head">
        <th>รหัส</th>
        <th>ชื่อตัวขี้วัด</th>
        <th>Indicator Type</th>
        <th style="width:100px;" v-for="item in criteria" :key="item.id">{{ item.name }} <span class="more-information" @click="showModal(item)">?</span></th>
        <th>Priority score</th>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td colspan="9" style="background-color: antiquewhite;">น้ำหนัก</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td style="background-color: antiquewhite;" v-for="item in criteria" :key="item.id">{{ item.weight }}</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td colspan="9" style="background-color: aliceblue;">Scale</td>
          <td></td>
        </tr>
          <tr>
          <td></td>
          <td></td>
          <td></td>
          <td style="background-color: aliceblue; text-align: left;" v-for="item in criteria" :key="item.id">
            <div v-for="scale in item.criteriaScales" :key="scale.id">{{ scale.value }} {{ scale.description | wordWrap }}</div>
          </td>
          <td></td>
        </tr>
        <tr v-for="(item, index) in filterDuplicate" :key="item.id">
          <td class="">{{ item.code }}</td>
          <td class="text-left">{{ item.name }}</td>
          <td class="">{{ item.indicator_type }}</td>
          <td v-for="(score, i) in item.prioritization_score" :key="score.criteria_id" class="score">
            <select v-model="score.score" class="form-control" :disabled="!showButton">
              <option v-for="scale in criteria[i].criteriaScales" :value="scale.value" :key="scale.id">{{ scale.value }}</option>
            </select>
          </td>
          <td v-bind:class="topScoreClass(index)">{{ priorityScore(index) }}</td>
        </tr>
        <tr v-if="!prioritization.length">
          <td colspan="13">No Data</td>
        </tr>
      </tbody>
    </table>
    <div v-if="returnMsg" class="text-center" :class="returnMsgClass">
      {{ returnMsg }}
    </div>
    <div
      v-if="showButton">
      <div class="col-md-12 form-group text-right">
        <!-- <button class="btn btn-warning" @click="save(true)" v-if="!isSave">Save Draft</button> -->
      </div>
      <div class="col-md-12 form-group text-center">
        <button class="btn btn-primary" @click="save(false)" v-if="!isSave">Submit</button>
        <!-- <button class="btn btn-danger">Close</button> -->
      </div>
    </div>
     <app-criteria
      v-show="isModalVisible"
      @close="closeModal"
      :criteria="selectedCriteria"
    />
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { saveAs } from 'file-saver'
import CriteriaScaleModal from '@/components/CriteriaScaleModal.vue'

export default {
  props: {
    org: Object,
    year: String
  },
  components: {
    appCriteria: CriteriaScaleModal
  },
  data () {
    return {
      isSave: false,
      user: JSON.parse(localStorage.getItem('user')),
      isDraft: true,
      isModalVisible: false,
      selectedCriteria: [],
      returnMsg: '',
      returnMsgClass: ''
    }
  },
  created () {
    this.$store.dispatch('period/getPeriodCompare', {
      type: 'Prioritization',
      year: new Date().getFullYear()
    })
  },
  methods: {
    showModal (criteria) {
      this.selectedCriteria = criteria
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    },
    priorityScore (index) {
      if (this.prioritization[index].prioritization_score !== undefined) {
        const result = this.prioritization[index].prioritization_score.reduce((total, obj, index) => {
          return total + (Number(obj.score) * this.criteria[index].weight)
        }, 0)
        this.$store.commit('prioritization/SET_PRIORITY_SCORE', {
          index,
          priority_score: result
        })
        return result
      }
    },
    topScoreClass (index) {
      return this.prioritization[index].priority_score === this.topScore ? 'top-score-text' : ''
    },
    save (isDraft) {
      this.$store.dispatch('prioritization/savePrioritization', {
        prioritization: this.prioritization,
        isDraft: isDraft
      })
        .then(() => {
          this.returnMsg = 'Save success'
          if (isDraft) {
            this.returnMsg = 'Save draft success'
          }
          this.returnMsgClass = 'text-success'
          this.isDraft = isDraft
          this.isSave = false
        })
        .catch(() => {
          this.returnMsg = 'Save failed'
          this.returnMsgClass = 'text-danger'
        })
    },
    exportExcel () {
      this.$store.dispatch('exportExcel/exportPrioritization', {
        org_id: this.org.id,
        year: this.year
      })
        .then(result => {
          const date = new Date()
          saveAs(new Blob([this.s2ab(atob(result))], { type: 'application/octet-stream' }), `Prioritization_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.xlsx`)
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
    ...mapFields('prioritization', [
      'criteria',
      'count',
      'prioritization',
      'perf',
      'msg',
      'topScore'
    ]),
    ...mapFields('period', [
      'onPeriod'
    ]),
    showButton () {
      return this.prioritization.length && parseInt(this.user.id) === this.org.creator.id && !this.perf.length && this.isDraft && this.onPeriod
    },
    filterDuplicate () {
      return Array.from(new Set(this.prioritization.map(a => a.code)))
        .map(code => {
          return this.prioritization.find(a => a.code === code)
        })
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
.prioritize-table {
  table {
    font-size: 12px;
    tr {
      td {
        select {
          margin: 0 auto;
          width: 70%;
          text-align: center;
        }
      }
    }
  }
  .btn-primary {
    margin: 0 10px;
  }
  .top-score-text {
    background-color: red;
    color: white;
    font-weight: bold;
  }
  .more-information {
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
}
</style>
