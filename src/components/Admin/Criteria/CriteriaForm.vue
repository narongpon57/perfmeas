<template>
  <div>
    <div class="container-fluid">
      <div class="panel content bg-content">
        <div class="topic headline">Add / Edit Prioritization Criteria</div>
        <div class="container">
          <div class="row">
            <div class="col-md-6 offset-md-3">
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Period:
                </div>
                <div class="col-md-8">
                  <select class="form-control form-control-sm">
                    <option>2018</option>
                    <option>2019</option>
                    <option>2020</option>
                  </select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Criteria Name:
                </div>
                <div class="col-md-8">
                  <input type="text" class="form-control form-control-sm">
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-4 text-right label-text">
                  Weight:
                </div>
                <div class="col-md-8">
                  <input type="text" class="form-control form-control-sm">
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
            </div>
          </div>
          <div class="row form-group">
            <div class="panel col-md-12">
              <div class="sub-topic">Scale</div>
              <div class="container">
                <table class="table">
                  <thead>
                    <th></th>
                    <th class="scale-value">Scale Value</th>
                    <th class="scale-desc">Description</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td><i class="fa fa-plus" aria-hidden="true" @click="addScale"></i></td>
                      <td><input type="number" class="form-control" v-model="value"></td>
                      <td><input type="text" class="form-control" v-model="description"></td>
                    </tr>
                    <tr v-for="(scale, index) in scales" :key="index">
                      <td><i class="fa fa-times" aria-hidden="true" @click="removeScale(index)"></i></td>
                      <td>{{ scale.value }}</td>
                      <td>{{ scale.description }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-12 text-center">
              <button class="btn btn-primary">Save</button>
              <button class="btn btn-danger" @click="$router.go(-1)">Close</button>
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
      value: '',
      description: '',
      scales: []
    }
  },
  methods: {
    addScale () {
      let description = this.description
      let value = this.value
      this.scales.push({
        value,
        description
      })
      this.description = ''
      this.value = ''
    },
    removeScale (index) {
      this.scales.splice(index, 1)
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
.panel {
  background-color: #fff;
}
.sub-topic {
  padding: 1rem;
  color: #337ab7;
  font-weight: bold;
}
.fa-plus,
.fa-times {
  cursor: pointer;
}
.fa-times {
  color: red;
}
.scale-value {
  width: 20%;
}
</style>
