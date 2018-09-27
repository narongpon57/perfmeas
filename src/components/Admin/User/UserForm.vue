<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Add / Edit User</div>
        <div class="container">
          <div class="row">
            <div class="col-md-6 offset-md-3">
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Employee Name:
                </div>
                <div class="col-md-8">
                  <input type="text" class="form-control form-control-sm">
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Employee ID:
                </div>
                <div class="col-md-8">
                  <input type="text" class="form-control form-control-sm">
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Email:
                </div>
                <div class="col-md-8">
                  <input type="text" class="form-control form-control-sm">
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  User Name:
                </div>
                <div class="col-md-8">
                  <input type="text" class="form-control form-control-sm">
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Password:
                </div>
                <div class="col-md-8">
                  <input type="text" class="form-control form-control-sm">
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Confirm Password:
                </div>
                <div class="col-md-8">
                  <input type="text" class="form-control form-control-sm">
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  User Type:
                </div>
                <div class="col-md-8">
                  <select class="form-control form-control-sm" id="exampleFormControlSelect1">
                    <option>All</option>
                    <option>Creator / HOD</option>
                    <option>Approver / Manager</option>
                    <option>Administrator</option>
                  </select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Status:
                </div>
                <div class="col-md-8">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" v-model="isActive" value="1">
                    <label class="form-check-label" for="">Active</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" v-model="isActive" value="0">
                    <label class="form-check-label" for="">Inactive</label>
                  </div>
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
export default {
  data () {
    return {
      isActive: ''
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
