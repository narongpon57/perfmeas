<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Approve List</div>
        <div class="container">
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Data of Year: </label>
              <select class="form-control form-control-sm" id="exampleFormControlSelect1">
                <option>2018</option>
                <option>2019</option>
                <option>2020</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Organization Type: </label>
              <select class="form-control form-control-sm" id="exampleFormControlSelect1">
                <option>Bu</option>
                <option>Sub Bu</option>
                <option>IPU / Division</option>
                <option>Department</option>
              </select>
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Risk Status: </label>
              <select class="form-control form-control-sm" id="exampleFormControlSelect1">
                <option>Initial</option>
                <option>Send to Manager</option>
                <option>Manager Approved</option>
                <option>Admin Reviewed</option>
                <option>Final Approved</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Status: </label>
              <select class="form-control form-control-sm" id="exampleFormControlSelect1">
                <option>All</option>
                <option>Draft</option>
                <option>Submit</option>
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
