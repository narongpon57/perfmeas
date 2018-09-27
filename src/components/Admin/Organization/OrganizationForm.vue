<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Add / Edit Organization</div>
        <div class="container">
          <div class="row">
            <div class="col-md-8 offset-md-2">
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Organization Type:
                </div>
                <div class="col-md-8">
                  <select class="form-control form-control-sm">
                    <option>Please Select</option>
                    <option>BU</option>
                    <option>Sub Bu</option>
                    <option>IPU / Division</option>
                    <option>Department</option>
                  </select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Organization Code:
                </div>
                <div class="col-md-8">
                  <input type="text" class="form-control form-control-sm">
                </div>
              </div>
               <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Organization Name:
                </div>
                <div class="col-md-8">
                  <input type="text" class="form-control form-control-sm">
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Organization Group:
                </div>
                <div class="col-md-8">
                  <select class="form-control form-control-sm">
                    <option>Please Select</option>
                    <option>IPD</option>
                    <option>OPD</option>
                    <option>Back Office</option>
                    <option>Critical Rare</option>
                    <option>Medical Support</option>
                  </select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Organization Year:
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
