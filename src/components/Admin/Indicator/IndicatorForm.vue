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
                  <input type="text" class="form-control form-control-sm" v-model="risk.code" readonly>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Risk Type:
                </div>
                <div class="col-md-9">
                  <v-select v-model="risk.risk_type" :options="risks_type"></v-select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Risk Group:
                </div>
                <div class="col-md-9">
                  <v-select v-model="risk.risk_group" :options="risk_group"></v-select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Risk Identified:
                </div>
                <div class="col-md-9">
                  <textarea class="form-control" v-model="risk.identified"></textarea>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Problem Area or Activity:
                </div>
                <div class="col-md-9">
                  <textarea class="form-control" v-model="risk.problem_area"></textarea>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Description:
                </div>
                <div class="col-md-9">
                  <textarea class="form-control" v-model="risk.description"></textarea>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3 text-right label-text">
                  Status:
                </div>
                <div class="col-md-9">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" v-model="risk.is_active" value="1">
                    <label class="form-check-label" for="">Active</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" v-model="risk.is_active" value="0">
                    <label class="form-check-label" for="">Inactive</label>
                  </div>
                </div>
              </div>
              <div class="row form-group ">
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

export default {
  data () {
    return {
      risks_type: ['General Risk', 'Clinical Risk', 'Sepcific Risk'],
      risk_group: ['OPD', 'IPD', 'Critical Care', 'Back Office', 'Medical Support']
    }
  },
  created () {
    if (this.$route.params.id !== undefined) {
      this.$store.dispatch('riskMaster/getRiskById', this.$route.params.id)
    }
  },
  methods: {
    ...mapActions('riskMaster', [
      'saveRisk',
      'updateRisk'
    ]),
    save () {
      let riskData = {}
      if (this.risk.id === undefined) {
        this.saveRisk(Object.assign(riskData, this.risk))
      } else {
        this.updateRisk(Object.assign(riskData, this.risk))
      }
    },
    back () {
      this.$router.go(-1)
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
</style>
