<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Add / Edit Risk</div>
        <div class="container">
          <div class="row">
            <div class="col-md-8 offset-md-2">
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Risk Code:
                </div>
                <div class="col-md-8">
                  <input type="text" class="form-control form-control-sm" disabled>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Risk Type:
                </div>
                <div class="col-md-8">
                  <v-select v-model="orgCodeSelected" :options="orgCode"></v-select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Category:
                </div>
                <div class="col-md-8">
                  <v-select v-model="orgCodeSelected" :options="orgCode"></v-select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Risk Identified:
                </div>
                <div class="col-md-8">
                  <textarea class="form-control"></textarea>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Problem Area or Activity:
                </div>
                <div class="col-md-8">
                  <textarea class="form-control"></textarea>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Description:
                </div>
                <div class="col-md-8">
                  <textarea class="form-control"></textarea>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Risk Owner:
                </div>
                <div class="col-md-8">
                  <v-select v-model="orgCodeSelected" :options="orgCode"></v-select>
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
      isActive: '',
      orgCode: ['BHQ', 'GLS001', 'GLS002', 'GLS003'],
      orgCodeSelected: ''
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
