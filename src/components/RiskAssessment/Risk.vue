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
            v-model="item.probability"></td>
          <td class="impact"><input
            type="text"
            class="form-control"
            v-model="item.impact"></td>
          <td class="risk-score"><input
            type="text"
            class="form-control risk-score-font"
            v-bind:class="riskScoreStyle(item.probability * item.impact)"
            readonly="readonly"
            :value="item.probability * item.impact"></td>
          <td class="indicator">
            <div v-for="(indicator, i) in item.risk_indicator"
              :key="indicator.indicator.id">
              <font-awesome-icon
                icon="times"
                class="remove-icon"
                @click="removeIndicator(index, i)"/> {{ indicator.indicator.name }}
            </div>
            <font-awesome-icon
              icon="plus-circle"
              class="float-right add-icon"
              @click="showIndicatorModal(index)"/>
          </td>
          <td class="strategy"><textarea
            row="3"
            class="form-control"
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
        v-if="parseInt(year) === new Date().getFullYear() && assessment.status !== 'Approve'">
        <button class="btn btn-info" @click="showRiskModal()">Add Risk</button>
        <span v-if="assessment.id && assessment.status === 'waiting for approve' && parseInt(user.id) === assessment.org.creator.id">
          <button class="btn btn-warning float-right"
            @click="showApproveModal('Review')">Review</button>
          <button class="btn btn-success float-right"
            @click="showApproveModal('Approve')">Approve</button>
        </span>
      </div>
      <div
        class="col-md-12 form-group"
        v-if="msg"
        v-bind:class="{ 'text-success': success, 'text-danger': !success }">
        {{ msg }}
      </div>
      <div class="col-md-12 form-group" v-if="assessment.risk_assessment.length">
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
    />
    <app-indicator-modal
      v-show="isIndicatorModalVisible"
      @close="closeIndicatorModal"
      :risk_index="row"
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

export default {
  props: ['org', 'year'],
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
      row: '',
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  created () {
    console.log(this.assessment, this.user)
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
      this.row = index
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
      const payload = {
        assessment: this.assessment,
        org: this.org,
        year: this.year
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
    }
  },
  computed: {
    ...mapFields('riskAssessment', [
      'assessment',
      'success',
      'msg',
      'approval',
      'approve'
    ])
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
