<template>
  <div class="col-md-12 text-center">
    <div class="text-right form-group">
      <button class="btn btn-info" @click="exportExcel()">Export Excel</button>
    </div>
    <table class="table table-bg" ref="test_table">
      <thead class="table-head">
        <th></th>
        <th>รหัสความเสี่ยง</th>
        <th>ประเภทความเสี่ยง</th>
        <th>ปัญหาหรือกิจกรรมที่เป็นความเสี่ยง</th>
        <th>รายการความเสี่ยง</th>
        <th>คำอธิบาย</th>
        <th>โอกาสเกิดเหตุ</th>
        <th>ความรุนแรงของผลกระทบ</th>
        <th>คะแนนความเสี่ยง</th>
        <th>ตัวชี้วัดปัจจุบัน</th>
        <th>กลยุทธ์จัดการความเสี่ยง</th>
      </thead>
      <tbody class="text-left">
        <tr
          v-for="(item, index) in assessment.risk_assessment"
          :key="item.id">
          <td>
            <font-awesome-icon
              icon="times"
              @click="removeRisk(index)"
              v-if="isCreator() && addRiskBtn.includes(assessment.status) && onPeriod"
              class="remove-icon"/>
          </td>
          <td>{{ item.risk.code }}</td>
          <td>{{ item.risk.risk_type }}</td>
          <td>{{ item.risk.problem_area }}</td>
          <td>{{ item.risk.identified }}</td>
          <td class="desc">{{ item.risk.description }}</td>
          <td class="probability"><input
            type="text"
            class="form-control"
            :class="isScoreValidaInput(item.probability)"
            :disabled="!isCreator() || !addRiskBtn.includes(assessment.status) || !onPeriod"
            v-model="item.probability"></td>
          <td class="impact"><input
            type="text"
            class="form-control"
            :class="isScoreValidaInput(item.impact)"
            :disabled="!isCreator() || !addRiskBtn.includes(assessment.status) || !onPeriod"
            v-model="item.impact"></td>
          <td class="risk-score"><input
            type="text"
            class="form-control risk-score-font"
            :disabled="true"
            v-bind:class="riskScoreStyle(item.probability * item.impact)"
            readonly="readonly"
            :value="item.probability * item.impact"></td>
          <td class="indicator" :class="isIndicator(item.risk_indicator)">
            <div v-for="(indicator, i) in item.risk_indicator"
              :key="indicator.indicator.id">
              <font-awesome-icon
                icon="times"
                class="remove-icon"
                v-if="isCreator() && addRiskBtn.includes(assessment.status) && onPeriod"
                @click="removeIndicator(index, i)"/>
              <span v-else>-</span> {{ indicator.indicator.name }}
            </div>
            <font-awesome-icon
              icon="plus-circle"
              class="float-right add-icon"
              v-if="isCreator() && addRiskBtn.includes(assessment.status) && onPeriod"
              @click="showIndicatorModal(index)"/>
          </td>
          <td class="strategy"><textarea
            rows="6"
            class="form-control"
            :class="isValidaInput(item.mitigation_strategy)"
            :disabled="!isCreator() || !addRiskBtn.includes(assessment.status) || !onPeriod"
            v-model="item.mitigation_strategy"></textarea></td>
        </tr>
        <tr v-show="!assessment.risk_assessment.length">
          <td colspan="11" class="text-center">No Data</td>
        </tr>
      </tbody>
    </table>
    <div v-if="onPeriod">
      <div
        class="row form-group"
        v-if="parseInt(year) === new Date().getFullYear()">
        <div class="col-md-6 text-left">
          <button
            class="btn btn-info"
            @click="showRiskModal()"
            v-if="isCreator() && addRiskBtn.indexOf(assessment.status) > -1">Add Risk</button>
        </div>
        <div class="col-md-6 text-right">
          <button
            class="btn btn-warning"
            @click="saveDraft()"
            v-if="isCreator() && saveDraftBtn.indexOf(assessment.status) > -1 && assessment.risk_assessment.length">
            Save Draft
          </button>
        </div>
      </div>
      <div
        class="col-md-12 form-group text-right"
        v-if="isApprover() && managerApproveBtn.indexOf(assessment.status) > -1">
        <button
          class="btn btn-success"
          @click="showApproveModal('Approve')">Approve</button>
        <button
          class="btn btn-warning"
          @click="showApproveModal('Review')">Review</button>
      </div>
      <div
        class="col-md-12 form-group text-right"
        v-if="isAdmin() && adminApproveBtn.indexOf(assessment.status) > -1">
        <button
          class="btn btn-success"
          @click="showApproveModal('Approve')">Approve</button>
        <button
          class="btn btn-warning"
          @click="showApproveModal('Review')">Review</button>
      </div>
      <div
        class="col-md-12 form-group"
        v-if="msg"
        v-bind:class="{ 'text-success': success, 'text-danger': !success }">
        {{ msg }}
      </div>
      <div class="col-md-12 form-group"
        v-if="assessment.risk_assessment.length && isCreator() && addRiskBtn.indexOf(assessment.status) > -1">
        <button class="btn btn-primary" @click="save()">Save</button>
      </div>
    </div>
    <div class="row form-group">
      <div class="col-md-8 offset-md-2 form-group" v-if="approval.length">
        <app-approval
          :approval="approval"></app-approval>
      </div>
    </div>
    <app-risk-modal
      v-show="isModalVisible"
      @close="closeRiskModal"
      :riskId="filterRiskId"
    />
    <app-indicator-modal
      v-show="isIndicatorModalVisible"
      @close="closeIndicatorModal"
      :riskIndex="row"
      :indicatorId="indicatorId"
    />
    <app-approve-modal
      v-show="isApproveModalVisible"
      @close="closeApproveModal"
    />
  </div>
</template>

<script>
import riskModal from '../RiskModal.vue'
import indicatorModal from '../IndicatorModal.vue'
import approveModal from '../ApproveModal.vue'
import Approval from './Approval.vue'
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import CONSTANTS from '@/constants/assessment_status'
import { saveAs } from 'file-saver'

export default {
  props: {
    org: Object,
    year: String
  },
  components: {
    'app-risk-modal': riskModal,
    'app-indicator-modal': indicatorModal,
    'app-approval': Approval,
    'app-approve-modal': approveModal
  },
  data () {
    return {
      isModalVisible: false,
      isIndicatorModalVisible: false,
      isApproveModalVisible: false,
      row: 0,
      indicatorId: [],
      user: JSON.parse(localStorage.getItem('user')),
      addRiskBtn: [CONSTANTS.MANAGER_REVIEW, CONSTANTS.QIKM_REVIEW, null, CONSTANTS.DRAFT],
      managerApproveBtn: [CONSTANTS.INITIAL],
      adminApproveBtn: [CONSTANTS.MANAGER_APPROVE, CONSTANTS.WAITING_FOR_APPROVE],
      saveDraftBtn: [CONSTANTS.DRAFT, null],
      isSubmitted: false
    }
  },
  created () {
    this.$store.dispatch('period/getPeriodCompare', {
      type: 'Risk Assessment',
      year: new Date().getFullYear()
    })
  },
  methods: {
    ...mapActions('riskAssessment', [
      'removeRiskAssess',
      'removeRiskIndicator',
      'saveRiskAssess',
      'updateRiskAssess'
    ]),
    showRiskModal () {
      this.isModalVisible = true
    },
    closeRiskModal () {
      this.isModalVisible = false
    },
    showIndicatorModal (index) {
      this.row = parseInt(index)
      this.indicatorId = this.assessment.risk_assessment[index].risk_indicator.map(obj => {
        return obj.indicator.id
      })
      this.isIndicatorModalVisible = true
    },
    closeIndicatorModal () {
      this.isIndicatorModalVisible = false
    },
    showApproveModal (action) {
      this.approve.status = action
      this.isApproveModalVisible = true
    },
    closeApproveModal () {
      this.isApproveModalVisible = false
    },
    save () {
      this.isSubmitted = true
      let payload = {
        assessment: this.assessment,
        org: this.org,
        year: this.year
      }
      let valid = true
      for (let i of this.assessment.risk_assessment) {
        let impact = parseInt(i.impact) < 1 || parseInt(i.impact) > 5
        let probability = parseInt(i.probability) < 1 || parseInt(i.probability) > 5
        let mitigationStrategy = i.mitigation_strategy === null || i.mitigation_strategy === '' || i.mitigation_strategy === undefined
        let indicatorLength = i.risk_indicator.length
        if (impact || probability || mitigationStrategy || indicatorLength === 0) {
          valid = false
        }
      }
      if (valid) {
        if (this.assessment.id === null) {
          payload['status'] = CONSTANTS.INITIAL
          this.saveRiskAssess(payload)
        } else {
          if (this.assessment.status === 'Draft') {
            payload['status'] = CONSTANTS.INITIAL
          } else {
            payload['status'] = this.assessment.status === CONSTANTS.MANAGER_REVIEW ? CONSTANTS.INITIAL : CONSTANTS.WAITING_FOR_APPROVE
          }
          this.updateRiskAssess(payload)
        }
      }
    },
    saveDraft () {
      this.isSubmitted = false
      let payload = {
        assessment: this.assessment,
        org: this.org,
        year: this.year,
        status: CONSTANTS.DRAFT
      }
      if (this.assessment.id === null) {
        this.saveRiskAssess(payload)
      } else {
        this.updateRiskAssess(payload)
      }
    },
    removeRisk (index) {
      let r = confirm('Do you want to delete this row ?')
      if (r) {
        this.removeRiskAssess(index)
      }
    },
    removeIndicator (riskIndex, indIndex) {
      let r = confirm('Do you want to delete this row ?')
      if (r) {
        const payload = {
          riskIndex,
          indIndex
        }
        this.removeRiskIndicator(payload)
      }
    },
    riskScoreStyle (riskScore) {
      let className = ''
      if (riskScore >= 1 && riskScore <= 3) className = 'low'
      else if (riskScore >= 4 && riskScore <= 6) className = 'mod'
      else if (riskScore >= 8 && riskScore <= 12) className = 'high'
      else if (riskScore >= 15 && riskScore <= 25) className = 'extreme'
      return className
    },
    exportExcel () {
      this.$store.dispatch('exportExcel/exportRiskAssessment', {
        org_id: this.org.id,
        year: this.year
      })
        .then(result => {
          const date = new Date()
          saveAs(new Blob([this.s2ab(atob(result))], { type: 'application/octet-stream' }), `Risk_Assessment_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.xlsx`)
        })
    },
    s2ab (s) {
      let buf = new ArrayBuffer(s.length)
      let view = new Uint8Array(buf)
      for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF
      }
      return buf
    },
    isCreator () {
      return parseInt(this.user.id) === this.org.creator.id
    },
    isApprover () {
      return parseInt(this.user.id) === this.org.step1_approver.id
    },
    isAdmin () {
      return parseInt(this.user.is_admin)
    },
    isScoreValidaInput (value1) {
      let value = parseInt(value1)
      let isValid = this.isSubmitted && (value < 1 || value > 5)
      return { 'is-invalid': isValid }
    },
    isValidaInput (value) {
      let isValid = this.isSubmitted && (value === undefined || value === '' || value === null)
      return { 'is-invalid': isValid }
    },
    isIndicator (indicators) {
      let isValid = this.isSubmitted && indicators.length === 0
      return { 'invalid': isValid }
    },
    closeRiskAssess () {
      this.isSearch = false
    }
  },
  computed: {
    ...mapFields('riskAssessment', [
      'assessment',
      'success',
      'msg',
      'approval',
      'approve'
    ]),
    ...mapFields('period', [
      'onPeriod'
    ]),
    filterRiskId () {
      return this.assessment.risk_assessment.map(obj => {
        return obj.risk.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-primary {
  margin: 0 10px;
}
table {
  font-size: 12px;
  tbody {
    font-weight: 700;
    input[type="text"],
    input[type="number"] {
      text-align: center;
      height: 30px;
      width: 70%;
      margin: 0 auto;
    }
  }
  .probability,
  .impact,
  .risk-score {
    width: 9%;
  }
  .desc {
    width: 15%;
  }
  .indicator {
    width: 13%;
  }
  .strategy {
    width: 19%;
  }
}

.btn-warning {
  margin-left: 10px;
}

.risk-score-font {
  font-weight: bold;
}

.low {
  background-color: green !important;
  color: white;
}
.mod {
  background-color: yellow !important;
}
.high {
  background-color: orange !important;
}
.extreme {
  background-color: red !important;
  color: white;
}
.invalid {
  border: 1px solid red;
}
</style>
