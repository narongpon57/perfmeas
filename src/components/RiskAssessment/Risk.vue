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
          v-for="(risk, index) in risk_assessment"
          :key="risk.id">
          <td>
            <font-awesome-icon
              icon="times"
              @click="removeRisk(index)"
              class="remove-icon"/>
          </td>
          <td>{{ risk.code }}</td>
          <td>{{ risk.risk_type }}</td>
          <td>{{ risk.problem_area }}</td>
          <td>{{ risk.identified }}</td>
          <td class="desc">{{ risk.description }}</td>
          <td class="probability"><input
            type="text"
            class="form-control"
            v-model="risk.probability"></td>
          <td class="impact"><input
            type="text"
            class="form-control"
            v-model="risk.impact"></td>
          <td class="risk-score"><input
            type="text"
            class="form-control"
            readonly="readonly"
            :value="risk.probability * risk.impact"></td>
          <td class="indicator">
            <div v-for="(indicator, i) in risk.risk_indicator"
              :key="indicator.id">
              <font-awesome-icon
                icon="times"
                class="remove-icon"
                @click="removeIndicator(index, i)"/> {{ indicator.name }}
            </div>
            <font-awesome-icon
              icon="plus-circle"
              class="float-right add-icon"
              @click="showIndicatorModal(index)"/>
          </td>
          <td class="strategy"><textarea
            row="3"
            class="form-control"
            v-model="risk.mitigation_strategy"></textarea></td>
        </tr>
        <tr v-show="!risk_assessment.length">
          <td colspan="11" class="text-center">No Data</td>
        </tr>
      </tbody>
    </table>
    <div class="col-md-12 form-group text-left">
      <button class="btn btn-info" @click="showRiskModal()">Add Risk</button>
    </div>
    <div
      class="col-md-12 form-group"
      v-if="msg"
      v-bind:class="{ 'text-success': success, 'text-danger': !success }">
      {{ msg }}
    </div>
    <div class="col-md-12" v-if="risk_assessment.length">
      <button class="btn btn-primary" @click="save()">Save</button>
      <button class="btn btn-danger">Close</button>
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
  </div>
</template>

<script>
import riskModal from '../RiskModal.vue'
import indicatorModal from '../IndicatorModal.vue'
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'

export default {
  props: ['org'],
  components: {
    'app-risk-modal': riskModal,
    'app-indicator-modal': indicatorModal
  },
  data () {
    return {
      isModalVisible: false,
      isIndicatorModalVisible: false,
      row: ''
    }
  },
  methods: {
    ...mapActions('riskAssessment', [
      'removeRiskAssess',
      'removeRiskIndicator',
      'saveRiskAssess'
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
    save () {
      const payload = {
        risk_assessment: this.risk_assessment,
        org: this.org
      }
      this.saveRiskAssess(payload)
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
    }
  },
  computed: {
    ...mapFields('riskAssessment', [
      'risk_assessment',
      'risk_indicator',
      'success',
      'msg'
    ]),
    riskscore () {
      return this.risk_assessment.map(item => {
        return Number(item.probability * item.impact)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-primary {
  margin: 0 5px;
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
</style>
