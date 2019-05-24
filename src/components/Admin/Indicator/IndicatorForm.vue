<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Add / Edit Indicator</div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-10 offset-md-1">
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Indicator Code:
                </div>
                <div class="col-md-9">
                  <input type="text" class="form-control form-control-sm" v-model="indicator.code" readonly>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Indicator Name <span class="text-danger">*</span> :
                </div>
                <div class="col-md-9">
                  <input
                    type="text"
                    class="form-control"
                    :class="isValidaInput(indicator.name)"
                    :disabled="!isAdmin()"
                    v-model="indicator.name">
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Reason <span class="text-danger">*</span> :
                </div>
                <div class="col-md-9">
                  <textarea
                    class="form-control"
                    rows="5"
                    :disabled="!isAdmin()"
                    v-model="indicator.reason"></textarea>
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
                    :disabled="!isAdmin()"
                    v-model="indicator.description"></textarea>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Indicator Type <span class="text-danger">*</span> :
                </div>
                <div class="col-md-3">
                  <select
                    class="form-control"
                    :class="isValidaInput(indicator.indicator_type)"
                    :disabled="!isAdmin()"
                    v-model="indicator.indicator_type">
                    <option v-for="type in indicator_type" :key="type" :value="type">{{ type }}</option>
                  </select>
                </div>
                <div class="col-md-3 text-right label-text">
                  Frequency <span class="text-danger">*</span> :
                </div>
                <div class="col-md-3">
                  <select
                    class="form-control"
                    :class="isValidaInput(indicator.frequency)"
                    :disabled="!isAdmin()"
                    v-model="indicator.frequency">
                    <option v-for="item in frequency" :key="item" :value="item">{{ item }}</option>
                  </select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Multiplier (a) <span class="text-danger">*</span> :
                </div>
                <div class="col-md-9">
                  <textarea
                    class="form-control"
                    rows="3"
                    :class="isValidaInput(indicator.multiplier)"
                    :disabled="!isAdmin()"
                    v-model="indicator.multiplier"></textarea>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Divisor (b) <span class="text-danger">*</span> :
                </div>
                <div class="col-md-9">
                  <textarea
                    class="form-control"
                    rows="3"
                    :class="isValidaInput(indicator.divisor)"
                    :disabled="!isAdmin()"
                    v-model="indicator.divisor"></textarea>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Unit <span class="text-danger">*</span> :
                </div>
                <div class="col-md-3">
                  <select
                    class="form-control"
                    v-model="indicator.unit"
                    :class="isValidaInput(indicator.unit)"
                    :disabled="!isAdmin()"
                    @change="setFormular">
                    <option v-for="u in unit" :key="u" :value="u">{{ u | comma }}</option>
                  </select>
                </div>
                <div class="col-md-3 text-right label-text">
                  Formular:
                </div>
                <div class="col-md-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="indicator.formular"
                    readonly="readonly">
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Operator <span class="text-danger">*</span> :
                </div>
                <div class="col-md-3">
                  <select
                    class="form-control"
                    v-model="indicator.operator"
                    :class="isValidaInput(indicator.operator)"
                    :disabled="!isAdmin()">
                    <option v-for="o in operator" :key="o" :value="o">{{ o }}</option>
                  </select>
                </div>
                <div class="col-md-3 text-right label-text">
                  Target <span class="text-danger">*</span> :
                </div>
                <div class="col-md-3">
                  <input
                    type="text"
                    class="form-control"
                    :class="isValidaInput(indicator.target)"
                    :disabled="!isAdmin()"
                    v-model="indicator.target">
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Measurement Domain <span class="text-danger">*</span> :
                </div>
                <div class="col-md-5">
                  <select
                    class="form-control"
                    :class="isValidaInput(indicator.measurement_domain)"
                    :disabled="!isAdmin()"
                    v-model="indicator.measurement_domain">
                    <option v-for="domain in measurement_domain" :key="domain" :value="domain">{{ domain }}</option>
                  </select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Standard <span class="text-danger">*</span> :
                </div>
                <div class="col-md-5">
                  <select
                    class="form-control"
                    :class="isValidaInput(indicator.standard)"
                    :disabled="!isAdmin()"
                    v-model="indicator.standard">
                    <option v-for="s in standard" :key="s" :value="s">{{ s }}</option>
                  </select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Start Date:
                </div>
                <div class="col-md-3">
                  <datepicker
                    v-model="indicator.start_date"
                    :format="'dd/MM/yyyy'"
                    :input-class="'form-control'"
                    :disabled="!isAdmin()"
                    ></datepicker>
                </div>
                <div class="col-md-3 text-right label-text">
                  End Date:
                </div>
                <div class="col-md-3">
                  <datepicker
                    v-model="indicator.end_date"
                    :format="'dd/MM/yyyy'"
                    :input-class="'form-control'"
                    :disabled="!isAdmin()"
                    ></datepicker>
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
                      v-model="indicator.is_active"
                      :disabled="!isAdmin()"
                      value="1">
                    <label class="form-check-label" for="">Active</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      v-model="indicator.is_active"
                      :disabled="!isAdmin()"
                      value="0">
                    <label class="form-check-label" for="">Inactive</label>
                  </div>
                </div>
              </div>
              <p
                class="text-center font-weight-bold"
                :class="returnMsgClass"
                v-if="returnMsg !== ''">{{ returnMsg }}</p>
              <div class="row form-group " v-if="isAdmin()">
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
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import Datepicker from 'vuejs-datepicker'

export default {
  components: {
    Datepicker
  },
  data () {
    return {
      unit: [1, 10, 100, 1000, 10000, 100000, 1000000],
      operator: ['=', '<', '>', '<=', '>='],
      indicator_type: ['Process', 'Access', 'Outcome', 'Process and Outcome'],
      measurement_domain: ['Clinical Quality Measures', 'Non Clinical Quality Measures', 'Population Health Quality Measures', 'Related Health Care Delivery Measures', 'Related Population Health Measures'],
      standard: ['Disease-Specific Care Programs', 'Facility Management and Safety', 'Hospital Management', 'Patient Care Process', 'Work Process'],
      frequency: ['Monthly', 'Quarterly', 'Half-yearly', 'Yearly'],
      isSubmitted: false,
      returnMsg: '',
      returnMsgClass: '',
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  created () {
    if (this.$route.params.id !== undefined) {
      this.$store.dispatch('indicatorMaster/getIndicatorById', this.$route.params.id)
    } else {
      this.$store.commit('indicatorMaster/RESET_STATE')
    }
  },
  methods: {
    ...mapActions('indicatorMaster', [
      'saveIndicator',
      'updateIndicator'
    ]),
    save () {
      let indicatorData = {}
      this.isSubmitted = true
      if (this.indicator.id === undefined) {
        this.saveIndicator(Object.assign(indicatorData, this.indicator))
          .then(() => {
            this.returnMsg = 'Save success'
            this.returnMsgClass = 'text-success'
          })
          .catch(() => {
            this.returnMsg = 'Save failed'
            this.returnMsgClass = 'text-danger'
          })
      } else {
        this.updateIndicator(Object.assign(indicatorData, this.indicator))
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
    setFormular () {
      this.$store.commit('indicatorMaster/SET_FORMULAR', '(a/b)*' + this.indicator.unit)
    },
    isAdmin () {
      return parseInt(this.user.is_admin)
    }
  },
  computed: {
    ...mapFields('indicatorMaster', ['indicator'])
  },
  filters: {
    comma (value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  button {
    margin-right: 5px;
  }
}
</style>
