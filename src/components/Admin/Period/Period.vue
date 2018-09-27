<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Period Management</div>
        <div class="text-right">
          <router-link to="/period_management_form" tag="button" class="btn btn-primary">Add Period</router-link>
        </div>
        <div class="container">
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Period Type: </label>
              <select class="form-control form-control-sm" id="exampleFormControlSelect1">
                <option>Performance Measurement</option>
                <option>Risk Assessment</option>
                <option>Prioritize</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Period Year: </label>
              <select class="form-control form-control-sm" id="exampleFormControlSelect1">
                <option>2018</option>
                <option>2019</option>
                <option>2020</option>
              </select>
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Period Name: </label>
              <input type="text" class="form-control form-control-sm">
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Status: </label>
              <select class="form-control form-control-sm" id="exampleFormControlSelect1">
                <option>Draft</option>
                <option>Published</option>
                <option>Inactive</option>
              </select>
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
