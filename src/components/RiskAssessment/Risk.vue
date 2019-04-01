<template>
  <div class="col-md-12 text-center">
    <table class="table table-bg">
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
              v-if="parseInt(user.id) === org.creator.id && assessment.status !== saveCloseBtn"
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
            :disabled="parseInt(user.id) !== org.creator.id || assessment.status === saveCloseBtn"
            v-model="item.probability"></td>
          <td class="impact"><input
            type="text"
            class="form-control"
            :disabled="parseInt(user.id) !== org.creator.id || assessment.status === saveCloseBtn"
            v-model="item.impact"></td>
          <td class="risk-score"><input
            type="text"
            class="form-control risk-score-font"
            :disabled="parseInt(user.id) !== org.creator.id && assessment.status !== saveCloseBtn"
            v-bind:class="riskScoreStyle(item.probability * item.impact)"
            readonly="readonly"
            :value="item.probability * item.impact"></td>
          <td class="indicator">
            <div v-for="(indicator, i) in item.risk_indicator"
              :key="indicator.indicator.id">
              <font-awesome-icon
                icon="times"
                class="remove-icon"
                v-if="parseInt(user.id) === org.creator.id && assessment.status !== saveCloseBtn"
                @click="removeIndicator(index, i)"/>
              <span v-else>-</span> {{ indicator.indicator.name }}
            </div>
            <font-awesome-icon
              icon="plus-circle"
              class="float-right add-icon"
              v-if="parseInt(user.id) === org.creator.id || assessment.status === saveCloseBtn"
              @click="showIndicatorModal(index)"/>
          </td>
          <td class="strategy"><textarea
            row="3"
            class="form-control"
            :disabled="parseInt(user.id) !== org.creator.id || assessment.status === saveCloseBtn"
            v-model="item.mitigation_strategy"></textarea></td>
        </tr>
        <tr v-show="!assessment.risk_assessment.length">
          <td colspan="11" class="text-center">No Data</td>
        </tr>
      </tbody>
    </table>
    <div>
      <div
        class="col-md-12 form-group text-left"
        v-if="parseInt(year) === new Date().getFullYear()">
        <button
          class="btn btn-info"
          @click="showRiskModal()"
          v-if="parseInt(user.id) === org.creator.id && addRiskBtn.indexOf(assessment.status) > -1">Add Risk</button>
      </div>
      <div
        class="col-md-12 form-group text-right"
        v-if="org.step1_approver.id === parseInt(user.id) && managerApproveBtn.indexOf(assessment.status) > -1">
        <button
          class="btn btn-success"
          @click="showApproveModal('Approve')">Approve</button>
        <button
          class="btn btn-warning"
          @click="showApproveModal('Review')">Review</button>
      </div>
      <div
        class="col-md-12 form-group text-right"
        v-if="parseInt(user.is_admin) && adminApproveBtn.indexOf(assessment.status) > -1">
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
        v-if="assessment.risk_assessment.length && parseInt(user.id) === org.creator.id && assessment.status !== saveCloseBtn">
        <button class="btn btn-primary" @click="save()">Save</button>
        <button class="btn btn-danger">Close</button>
      </div>
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
      addRiskBtn: [CONSTANTS.MANAGER_REVIEW, CONSTANTS.QIKM_REVIEW, null],
      managerApproveBtn: [CONSTANTS.INITIAL],
      adminApproveBtn: [CONSTANTS.MANAGER_APPROVE, CONSTANTS.WAITING_FOR_APPROVE],
      saveCloseBtn: CONSTANTS.QIKM_APPROVE
    }
  },
  created () {
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
      let payload = {
        assessment: this.assessment,
        org: this.org,
        year: this.year
      }
      if (this.assessment.id === null) {
        payload['status'] = CONSTANTS.INITIAL
        this.saveRiskAssess(payload)
      } else {
        payload['status'] = this.assessment.status === CONSTANTS.MANAGER_REVIEW ? CONSTANTS.INITIAL : CONSTANTS.WAITING_FOR_APPROVE
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
      width: 50%;
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
</style>
