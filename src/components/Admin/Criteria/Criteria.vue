<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Prioritization Criteria</div>
        <div class="text-right">
          <router-link to="/prioritization_criteria_form" tag="button" class="btn btn-primary">Add Prioritization Criteria</router-link>
        </div>
        <div class="container">
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Period: </label>
              <select class="form-control form-control-sm">
                <option>2018</option>
                <option>2019</option>
                <option>2020</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Status: </label>
              <select class="form-control form-control-sm" id="exampleFormControlSelect1">
                <option>All</option>
                <option>Active</option>
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
}
</script>

<style>

</style>
