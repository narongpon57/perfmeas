<template>
  <transition name="modal1-fade">
    <div class="modal1-backdrop">
      <div class="modal1"
        role="dialog"
        aria-labelledby="modal1Title"
        aria-describedby="modal1Description">
        <header class="modal1-header" id="modal1Title">
          <slot name="header">
            Risk Management
            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal1"
            >
              x
            </button>
          </slot>
        </header>
        <section
          class="modal1-body"
          id="modal1Description"
        >
          <slot name="body">
            <div class="container">
              <div class="row form-group text-left">
                <div class="col-md-6">
                  <label for="" class="font-normal">กลุ่มความเสี่ยง: </label>
                  <v-select v-model="risk.risk_group" :options="risk_group"></v-select>
                </div>
                <div class="col-md-6">
                  <label for="" class="font-normal">ประเภทความเสี่ยง: </label>
                  <v-select v-model="risk.risk_type" :options="risk_type"></v-select>
                </div>
              </div>
              <div class="row form-group text-left">
                <div class="col-md-6">
                  <label for="" class="font-normal">ปัญหาหรือกิจกรรมที่เป็นความเสี่ยง: </label>
                  <input type="text" class="form-control" v-model="risk.problem_area" />
                </div>
                <div class="col-md-6">
                  <label for="" class="font-normal">รายการความเสี่ยง: </label>
                  <input type="text" class="form-control" v-model="risk.identified" />
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-6 text-right">
                  <button class="btn btn-info" @click="search">Search</button>
                </div>
                <div class="col-md-6 text-left">
                  <button class="btn btn-danger" @click="clear">Clear</button>
                </div>
              </div>
              <div class="row" v-show="isSearch">
                <table class="table table-bg">
                  <thead class="table-head">
                    <th></th>
                    <th class="risk-type">Risk Type</th>
                    <th class="risk-group">Risk Group</th>
                    <th>Problem Area or Activity</th>
                    <th>Indentified</th>
                    <th class="desc">Description</th>
                  </thead>
                  <tbody class="text-left">
                    <tr v-for="risk in risks" :key="risk.id">
                      <td>
                        <input
                          :value="risk"
                          v-model="selectedRisk"
                          type="checkbox">
                      </td>
                      <td>{{ risk.risk_type }}</td>
                      <td>{{ risk.risk_group }}</td>
                      <td>{{ risk.problem_area }}</td>
                      <td>{{ risk.identified }}</td>
                      <td>{{ risk.description }}</td>
                    </tr>
                    <tr v-if="!risks.length" class="text-center">
                      <td colspan="6">No Data</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </slot>
        </section>
        <footer class="modal1-footer">
          <slot name="footer">
            <button class="btn btn-info"
              @click="selected()"
              v-if="risks.length">Select</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'

export default {
  props: {
    riskId: Array
  },
  data () {
    return {
      risk_type: ['General Risk', 'Clinical Risk', 'Sepcific Risk'],
      risk_group: ['OPD', 'IPD', 'Critical Care', 'Back Office', 'Medical Support'],
      risk: {
        risk_group: '',
        risk_type: '',
        identified: '',
        problem_area: ''
      },
      isSearch: false,
      selectedRisk: []
    }
  },
  created () {
  },
  methods: {
    ...mapActions('riskAssessment', ['addRiskAssess']),
    ...mapActions('riskMaster', ['searchRisk']),
    close () {
      this.isSearch = false
      this.risk = {
        risk_group: '',
        risk_type: '',
        identified: '',
        problem_area: ''
      }
      this.$store.commit('riskMaster/RESET_STATE')
      this.$emit('close')
    },
    search () {
      const payload = {
        risk: this.risk,
        riskIds: this.riskId
      }
      this.searchRisk(payload)
        .then(() => {
          this.isSearch = true
        })
    },
    clear () {
      this.isSearch = false
      this.risk = {
        risk_group: '',
        risk_type: '',
        identified: '',
        problem_area: ''
      }
      this.$store.commit('riskMaster/RESET_STATE')
    },
    selected () {
      this.addRiskAssess(this.selectedRisk)
      this.selectedRisk = []
      this.isSearch = false
      this.$store.commit('riskMaster/RESET_STATE')
      this.$emit('close')
    }
  },
  computed: {
    ...mapFields('riskMaster', [
      'risks'
    ])
  }
}
</script>
<style lang="scss" scoped>
  .modal1-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal1 {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 80%;
  }

  .modal1-header,
  .modal1-footer {
    padding: 15px;
    display: flex;
  }

  .modal1-header {
    border-bottom: 1px solid #eeeeee;
    color: #fff;
    font-weight: bold;
    justify-content: space-between;
    background-color: #2e9ad0;
    min-height: 55px;
  }

  .modal1-footer {
    min-height: 70px;
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal1-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 1rem;
    cursor: pointer;
    font-weight: bold;
    color: #fff;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #2e9ad0;
    border: 1px solid #2e9ad0;
    border-radius: 2px;
  }
  .table {
    font-size: 0.85rem;
    .desc {
      width: 55%;
    }
    .risk-type,
    .risk-group {
      width: 8%;
    }
  }
</style>
