<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Add / Edit Risk</div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-10 offset-md-1">
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Risk Code:
                </div>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="risk.code" readonly>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Risk Type <span class="text-danger">*</span> :
                </div>
                <div class="col-md-9">
                  <select
                    v-model="risk.risk_type"
                    class="form-control"
                    :disabled="!isAdmin()"
                    :class="isValidaInput(risk.risk_type)">
                    <option v-for="type in risks_type" :key="type">{{ type }}</option>
                  </select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Risk Group <span class="text-danger">*</span> :
                </div>
                <div class="col-md-9">
                  <select
                    v-model="risk.risk_group"
                    class="form-control"
                    :disabled="!isAdmin()"
                    :class="isValidaInput(risk.risk_group)">
                    <option v-for="group in risk_group" :key="group">{{ group }}</option>
                  </select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Risk Identified <span class="text-danger">*</span> :
                </div>
                <div class="col-md-9">
                  <textarea
                    class="form-control"
                    rows="3"
                    v-model="risk.identified"
                    :disabled="!isAdmin()"
                    :class="isValidaInput(risk.identified)"></textarea>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Problem Area or Activity <span class="text-danger">*</span> :
                </div>
                <div class="col-md-9">
                  <textarea
                    class="form-control"
                    rows="3"
                    v-model="risk.problem_area"
                    :disabled="!isAdmin()"
                    :class="isValidaInput(risk.problem_area)"></textarea>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Description <span class="text-danger">*</span> :
                </div>
                <div class="col-md-9">
                  <textarea
                    class="form-control"
                    rows="5"
                    v-model="risk.description"
                    :disabled="!isAdmin()"
                    :class="isValidaInput(risk.description)"></textarea>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Status:
                </div>
                <div class="col-md-9">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      v-model="risk.is_active"
                      :disabled="!isAdmin()"
                      value="1">
                    <label class="form-check-label" for="">Active</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      v-model="risk.is_active"
                      :disabled="!isAdmin()"
                      value="0">
                    <label class="form-check-label" for="">Inactive</label>
                  </div>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-12">
                  <div class="label-text">Relate to Indicator : Existing Measures (ตัวขี้วัดปัจจุบัน)</div>
                  <table class="table table-bg text-center">
                    <thead class="table-head">
                      <th></th>
                      <th>รหัส</th>
                      <th>ชื่อ</th>
                      <th>ตัวตั้ง (a)</th>
                      <th>ตัวหาร (b)</th>
                      <th>สูตรการคำนวณ</th>
                      <th>เครื่องหมาย</th>
                      <th>เป้าหมาย</th>
                    </thead>
                    <tbody class="text-left">
                      <tr v-for="(existing, index) in risk.existing_risk" :key="existing.id">
                        <td>
                          <font-awesome-icon
                            icon="times"
                            @click="removeExistingMeasure(index)"
                            v-if="isAdmin()"
                            class="remove-icon"/>
                        </td>
                        <td>{{ existing.indicator.code }}</td>
                        <td>{{ existing.indicator.name }}</td>
                        <td>{{ existing.indicator.multiplier }}</td>
                        <td>{{ existing.indicator.divisor }}</td>
                        <td>{{ existing.indicator.formular }}</td>
                        <td>{{ existing.indicator.operator }}</td>
                        <td>{{ existing.indicator.target }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    class="col-md-12 form-group text-left">
                    <button
                      class="btn btn-info"
                      v-if="isAdmin()"
                      @click="showIndicatorModal()">Add Indicator</button>
                  </div>
                </div>
              </div>
              <p
                class="text-center font-weight-bold"
                :class="returnMsgClass"
                v-if="returnMsg !== ''">{{ returnMsg }}</p>
              <div
                class="row form-group"
                v-if="isAdmin()">
                <div class="col-md-12 text-center">
                  <button class="btn btn-primary" @click="save()">Save</button>
                  <button class="btn btn-danger" @click="$router.go(-1)">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-existing-modal
      v-show="isIndicatorModalVisible"
      @close="closeIndicatorModal"
      :indicatorId="indicatorId"/>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import ExisitngMeasureModal from '../../ExisitngMeasureModal.vue'

export default {
  components: {
    appExistingModal: ExisitngMeasureModal
  },
  data () {
    return {
      risks_type: ['General Risk', 'Clinical Risk', 'Sepcific Risk'],
      risk_group: ['OPD', 'IPD', 'Critical Care', 'Back Office', 'Medical Support'],
      isIndicatorModalVisible: false,
      indicatorId: [],
      isSubmitted: false,
      user: JSON.parse(localStorage.getItem('user')),
      returnMsg: '',
      returnMsgClass: ''
    }
  },
  created () {
    if (this.$route.params.id !== undefined) {
      this.$store.dispatch('riskMaster/getRiskById', this.$route.params.id)
    } else {
      this.$store.commit('riskMaster/RESET_STATE')
    }
  },
  methods: {
    ...mapActions('riskMaster', [
      'saveRisk',
      'updateRisk'
    ]),
    save () {
      let riskData = {}
      this.isSubmitted = true
      if (this.risk.id === undefined) {
        this.saveRisk(Object.assign(riskData, this.risk))
          .then(() => {
            this.returnMsg = 'Save success'
            this.returnMsgClass = 'text-success'
          })
          .catch(() => {
            this.returnMsg = 'Save failed'
            this.returnMsgClass = 'text-danger'
          })
      } else {
        this.updateRisk(Object.assign(riskData, this.risk))
          .then(() => {
            this.returnMsg = 'Update success'
            this.returnMsgClass = 'text-success'
          })
          .catch(() => {
            this.returnMsg = 'Update failed'
            this.returnMsgClass = 'text-danger'
          })
      }
    },
    back () {
      this.$router.go(-1)
    },
    isValidaInput (value) {
      let isValid = this.isSubmitted && (value === undefined || value === '')
      return { 'is-invalid': isValid }
    },
    removeExistingMeasure (index) {
      let r = confirm('Do you want to delete this row ?')
      if (r) {
        this.$store.commit('riskMaster/REMOVE_EXISTING_MEASURE', index)
      }
    },
    showIndicatorModal () {
      this.indicatorId = this.risk.existing_risk.map(obj => {
        return obj.indicator.id
      })
      this.isIndicatorModalVisible = true
    },
    closeIndicatorModal () {
      this.isIndicatorModalVisible = false
    },
    isAdmin () {
      return parseInt(this.user.is_admin)
    }
  },
  computed: {
    ...mapFields('riskMaster', ['risk'])
  }
}
</script>

<style lang="scss" scoped>
.row {
  button {
    margin-right: 5px;
  }
}
.table {
  font-size: 0.85rem;
}
</style>
