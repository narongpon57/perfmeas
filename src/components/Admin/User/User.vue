<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">User Management</div>
        <div class="text-right">
          <router-link to="/user_management_form" tag="button" class="btn btn-primary">Add User</router-link>
        </div>
        <div class="container">
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">User Type: </label>
              <select class="form-control form-control-sm" id="exampleFormControlSelect1">
                <option>All</option>
                <option>Creator / HOD</option>
                <option>Approver / Manager</option>
                <option>Administrator</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Bu: </label>
              <v-select v-model="orgCodeSelected" :options="orgCode"></v-select>
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-6">
              <label for="" class="font-normal">Employee ID: </label>
              <input type="text" class="form-control form-control-sm">
            </div>
            <div class="col-md-6">
              <label for="" class="font-normal">Employee Name: </label>
              <input type="text" class="form-control form-control-sm">
            </div>
          </div>
          <div class="row form-group">
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
