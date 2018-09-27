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
                  <select class="form-control form-control-sm" id="exampleFormControlSelect1">
                    <option value="0">Please Select</option>
                    <option>Performance Measurement</option>
                    <option>Risk Management</option>
                    <option>Prioritization</option>
                  </select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Period Year:
                </div>
                <div class="col-md-8">
                  <select class="form-control form-control-sm" id="exampleFormControlSelect1">
                    <option value="0">Please Select</option>
                    <option>2018</option>
                    <option>2019</option>
                    <option>2020</option>
                  </select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Period Month:
                </div>
                <div class="col-md-8">
                  <select class="form-control form-control-sm" id="exampleFormControlSelect1">
                    <option value="0">Please Select</option>
                    <option v-for="i in 12" :key="i" :value="i">{{ i }}</option>
                  </select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Period Name:
                </div>
                <div class="col-md-8">
                  <input type="text" class="form-control form-control-sm">
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Date From:
                </div>
                <div class="col-md-8">
                  <datepicker
                    :value="dateFrom"
                    :format="'dd/MM/yyyy'"
                    :calendar-button="true"
                    :calendar-button-icon="'fa fa-calendar'"
                    ></datepicker>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Date To:
                </div>
                <div class="col-md-8">
                  <datepicker
                    :value="dateTo"
                    :format="'dd/MM/yyyy'"
                    :calendar-button="true"
                    :calendar-button-icon="'fa fa-calendar'"
                    ></datepicker>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Status:
                </div>
                <div class="col-md-8">
                  <select class="form-control form-control-sm" id="exampleFormControlSelect1">
                    <option value="0">Please Select</option>
                    <option>Draft</option>
                    <option>Published</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
              <div class="row form-group ">
                <div class="col-md-12 text-center">
                  <button class="btn btn-primary">Save</button>
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

import Datepicker from 'vuejs-datepicker'

export default {
  components: {
    Datepicker
  },
  data () {
    return {
      isActive: '',
      orgCode: ['BHQ', 'GLS001', 'GLS002', 'GLS003'],
      orgCodeSelected: '',
      dateFrom: new Date(),
      dateTo: new Date()
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
