<template>
  <transition name="modal1-fade">
    <div class="modal1-backdrop">
      <div class="modal1"
        role="dialog"
        aria-labelledby="modal1Title"
        aria-describedby="modal1Description">
        <header class="modal1-header" id="modal1Title">
          <slot name="header">
            Indicator Management
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
                  <label for="" class="font-normal">Indicator Name: </label>
                  <input type="text" class="form-control" v-model="indicator.name" />
                </div>
                <div class="col-md-6">
                  <label for="" class="font-normal">Indicator Type: </label>
                  <v-select v-model="indicator.indicator_type" :options="indicator_type"></v-select>
                </div>
              </div>
              <div class="row form-group text-left">
                <div class="col-md-6">
                  <label for="" class="font-normal">Standard: </label>
                  <v-select v-model="indicator.standard" :options="standard"></v-select>
                </div>
                <div class="col-md-6">
                  <label for="" class="font-normal">Measurement Domain: </label>
                  <v-select v-model="indicator.measurement_domain" :options="measurement_domain"></v-select>
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
                    <th>รหัส</th>
                    <th>ชื่อ</th>
                    <th>ตัวตั้ง (a)</th>
                    <th>ตัวหาร (b)</th>
                    <th>สูตรการคำนวณ</th>
                    <th>เครื่องหมาย</th>
                  </thead>
                  <tbody class="text-left">
                    <tr v-for="indicator in indicators" :key="indicator.id">
                      <td>
                        <input
                          type="checkbox"
                          :value="indicator"
                          v-model="selectedIndicator"/>
                      </td>
                      <td>{{ indicator.code }}</td>
                      <td>{{ indicator.name }}</td>
                      <td>{{ indicator.multiplier }}</td>
                      <td>{{ indicator.divisor }}</td>
                      <td>{{ indicator.formular }}</td>
                      <td>{{ indicator.operator }}</td>
                    </tr>
                    <tr v-if="!indicators.length" class="text-center">
                      <td colspan="7">No Data</td>
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
              v-if="indicators.length">Select</button>
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
    riskIndex: Number,
    indicatorId: Array
  },
  data () {
    return {
      standard: ['Disease-Specific Care Programs', 'Facility Management and Safety', 'Hospital Management', 'Patient Care Process', 'Work Process'],
      measurement_domain: ['Clinical Quality Measures', 'Non Clinical Quality Measures', 'Population Health Quality Measures', 'Related Health Care Delivery Measures', 'Related Population Health Measures'],
      indicator_type: ['Process', 'Access', 'Outcome', 'Process and Outcome'],
      indicator: {
        name: '',
        indicator_type: '',
        standard: '',
        measurement_domain: ''
      },
      isSearch: false,
      selectedIndicator: []
    }
  },
  methods: {
    ...mapActions('indicatorMaster', ['searchIndicator']),
    ...mapActions('riskAssessment', ['addRiskIndicator']),
    close () {
      this.isSearch = false
      this.indicator = {
        name: '',
        indicator_type: '',
        standard: '',
        measurement_domain: ''
      }
      this.$store.commit('indicatorMaster/RESET_STATE')
      this.$emit('close')
    },
    search () {
      const payload = {
        indicator: this.indicator,
        indicatorIds: this.indicatorId
      }
      this.searchIndicator(payload)
        .then(() => {
          this.isSearch = true
        })
    },
    clear () {
      this.isSearch = false
      this.indicator = {
        name: '',
        indicator_type: '',
        standard: '',
        measurement_domain: ''
      }
      this.$store.commit('indicatorMaster/RESET_STATE')
    },
    selected () {
      const payload = {
        indicators: this.selectedIndicator,
        risk_index: this.riskIndex
      }
      this.addRiskIndicator(payload)
      this.selectedIndicator = []
      this.isSearch = false
      this.$store.commit('indicatorMaster/RESET_STATE')
      this.$emit('close')
    }
  },
  computed: {
    ...mapFields('indicatorMaster', [
      'indicators'
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
