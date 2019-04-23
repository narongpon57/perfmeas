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
                  <select class="form-control " v-model="period.type">
                    <option v-for="i in type" :key="i" :value="i">{{ i }}</option>
                  </select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Period Year:
                </div>
                <div class="col-md-8">
                  <select class="form-control " v-model="period.year">
                    <option v-for="y in year" :key="y" :value="y">{{ y }}</option>
                  </select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Period Name:
                </div>
                <div class="col-md-8">
                  <input type="text" class="form-control " v-model="period.name">
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Date From:
                </div>
                <div class="col-md-8">
                  <datepicker
                    v-model="period.date_from"
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
                  <select class="form-control " v-model="period.status">
                    <option v-for="s in status" :key="s" :value="s">{{ s }}</option>
                  </select>
                </div>
              </div>
              <div class="row form-group ">
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
      year: ['2018', '2019', '2020']
    }
  },
  created () {
    if (this.$route.params.id !== undefined) {
      this.$store.dispatch('period/getPeriodById', this.$route.params.id)
    }
  },
  methods: {
    ...mapActions('period', [
      'savePeriod',
      'updatePeriod'
    ]),
    save () {
      console.log(this.period)
      let periodData = {}
      if (this.period.id === undefined) {
        this.savePeriod(Object.assign(periodData, this.period))
      } else {
        this.updatePeriod(Object.assign(periodData, this.period))
      }
    },
    back () {
      this.$router.go(-1)
    },
    setFormular () {}
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
