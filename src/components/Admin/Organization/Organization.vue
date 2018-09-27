<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Organization Management</div>
        <div class="text-right">
          <router-link to="/organization_management_form" tag="button" class="btn btn-primary">Add Organization</router-link>
        </div>
        <div class="container">
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Organization Type: </label>
              <select class="form-control form-control-sm">
                <option>Please Select</option>
                <option>BU</option>
                <option>Sub Bu</option>
                <option>IPU / Division</option>
                <option>Department</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Organization Group: </label>
              <select class="form-control form-control-sm">
                <option>Please Select</option>
                <option>IPD</option>
                <option>OPD</option>
                <option>Back Office</option>
                <option>Critical Care</option>
                <option>Medical Support</option>
              </select>
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Organization Name: </label>
              <input type="text" class="form-control form-control-sm">
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Oragnization Code: </label>
              <input type="text" class="form-control form-control-sm">
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-6 text-right">
              <button class="btn btn-info">Search</button>
            </div>
            <div class="col-md-6">
              <button class="btn btn-danger">Clear</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orgCode: ['BHQ', 'GLS001', 'GLS002', 'GLS003'],
      orgCodeSelected: ''
    }
  }
}
</script>

<style>

</style>
