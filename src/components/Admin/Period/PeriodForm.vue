<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Add / Edit Period</div>
        <div class="container">
          <div class="row">
            <div class="col-md-8 offset-md-2">
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Period Type:
                </div>
                <div class="col-md-8">
                  <select class="form-control " v-model="period.type" :disabled="!isAdmin()" :class="isValidaInput(period.type)">
                    <option v-for="i in type" :key="i" :value="i">{{ i }}</option>
                  </select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Period Year:
                </div>
                <div class="col-md-8">
                  <select class="form-control " v-model="period.year" :disabled="!isAdmin()" :class="isValidaInput(period.year)">
                    <option v-for="y in year" :key="y" :value="y">{{ y }}</option>
                  </select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Period Name:
                </div>
                <div class="col-md-8">
                  <input type="text" class="form-control " v-model="period.name" :disabled="!isAdmin()" :class="isValidaInput(period.name)">
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Date From:
                </div>
                <div class="col-md-8">
                  <datepicker
                    v-model="period.date_from"
                    :disabled="!isAdmin()"
                    :format="'dd/MM/yyyy'"
                    :input-class="'form-control'"
                    ></datepicker>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Date To:
                </div>
                <div class="col-md-8">
                  <datepicker
                    v-model="period.date_to"
                    :disabled="!isAdmin()"
                    :format="'dd/MM/yyyy'"
                    :input-class="'form-control'"
                    ></datepicker>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Published Date:
                </div>
                <div class="col-md-8">
                  <datepicker
                    v-model="period.published_date"
                    :disabled="!isAdmin()"
                    :format="'dd/MM/yyyy'"
                    :input-class="'form-control'"
                    ></datepicker>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Status:
                </div>
                <div class="col-md-8">
                  <select class="form-control" v-model="period.status" :disabled="!isAdmin()" :class="isValidaInput(period.status)">
                    <option v-for="s in status" :key="s" :value="s">{{ s }}</option>
                  </select>
                </div>
              </div>
              <p
                class="text-center font-weight-bold"
                :class="returnMsgClass"
                v-if="returnMsg !== ''">{{ returnMsg }}</p>
              <div class="row form-group " v-if="isAdmin()">
                <div class="col-md-12 text-center">
                  <button class="btn btn-primary" @click="save">Save</button>
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
      status: ['Draft', 'Published', 'Inactive'],
      type: ['Performance Measurement', 'Risk Assessment', 'Prioritization'],
      year: ['2018', '2019', '2020'],
      user: JSON.parse(localStorage.getItem('user')),
      returnMsg: '',
      returnMsgClass: '',
      isSubmitted: false
    }
  },
  created () {
    if (this.$route.params.id !== undefined) {
      this.$store.dispatch('period/getPeriodById', this.$route.params.id)
    } else {
      this.$store.commit('period/RESET_PERIOD')
    }
  },
  methods: {
    ...mapActions('period', [
      'savePeriod',
      'updatePeriod'
    ]),
    save () {
      let periodData = {}
      this.isSubmitted = true
      if (this.period.id === undefined) {
        this.savePeriod(Object.assign(periodData, this.period))
          .then(() => {
            this.returnMsg = 'Save success'
            this.returnMsgClass = 'text-success'
          })
          .catch(() => {
            this.returnMsg = 'Save failed'
            this.returnMsgClass = 'text-danger'
          })
      } else {
        this.updatePeriod(Object.assign(periodData, this.period))
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
    isValidaInput (value) {
      let isValid = this.isSubmitted && (value === undefined || value === '')
      return { 'is-invalid': isValid }
    },
    back () {
      this.$router.go(-1)
    },
    isAdmin () {
      return parseInt(this.user.is_admin)
    }
  },
  computed: {
    ...mapFields('period', ['period'])
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
